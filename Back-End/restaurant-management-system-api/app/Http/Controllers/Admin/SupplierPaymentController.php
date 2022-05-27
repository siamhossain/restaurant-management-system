<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\AccountingHandler;
use App\Http\Controllers\Controller;
use App\Models\Due;
use App\Models\StoreInformation;
use App\Models\SupplierPayment;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class SupplierPaymentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $supplier_payments = SupplierPayment::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $supplier_payments->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $supplier_payments = $supplier_payments->skip($Offset)->take($RowsPerPage)->with('supplier')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales Order Return"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $supplier_payments,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return SupplierPayment|string
     */

    public function save(Request $request)
    {
//        return $request->all();
        try {

            $uuid = (string)$request->input('uuid');

            $checkExistence = SupplierPayment::where('uuid', '=', $uuid);
            if ($uuid != null && $checkExistence->exists()) {
                $supplier_payment = $checkExistence->first();
//                $supplier_payment->updated_by_uuid = auth()->user()->uuid;
            } else {
                $supplier_payment = new SupplierPayment();
                $module_code = UAP::$MODULES['SUPPLIER_PAYMENT']['Code'];
                $prefix = UAP::$MODULES['SUPPLIER_PAYMENT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $supplier_payment->code = $generated_doc_code;
//                $supplier_payment->created_by_uuid = auth()->user()->uuid;
                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }


            //return $reference;


            $supplier_payment->date = (string)$request->input('date');
            $supplier_payment->supplier_uuid = (string)$request->input('supplier_uuid');
            $supplier_payment->reference = "Due Payment";
            $supplier_payment->paid_amount = (double)$request->input('paid_amount');
            $supplier_payment->prev_due_amount = (double)$request->input('supplier_due');
            $supplier_payment->note = (string)$request->input('note');
            $supplier_payment->save();

            if ($supplier_payment->save()) {
                if (AccountingHandler::autoEntryEnabled()) {
                    $accounting_setting = AccountingHandler::getSettings('supplier_payment');

                    if ($accounting_setting) {

                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => true,
                            'account_category_uuid' => $accounting_setting->account_category_uuid,
                            'account_category_name' => $accounting_setting->account_category_name,
                            'account_head_uuid' => $accounting_setting->account_head_uuid,
                            'account_head_name' => $accounting_setting->account_head_name,
                            'type' => 'Expense',
                            'comment' => $supplier_payment->code,
                            'total_amount' => $supplier_payment->paid_amount,
                            'date' => $supplier_payment->date,
                        ]);
                    }
                }
            }


            return Endpoint::endWith(true, Endpoint::savedMessage(), $supplier_payment->refresh()->uuid);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @var $type "regular" | "installment"
     */
    public function getDueAmount(Request $request)
    {
        try {
            $supplier_uuid = (string)$request->input('supplier_uuid');
            $net_due = 0;
            $total_due = 0;
            $total_payment = 0;

            $dueDocument = Due::where('participant_type', '=', 'Supplier')->where('participant_uuid', '=', $supplier_uuid)->where('is_deleted', '=', 0);
            if ($dueDocument->exists()) {
                $total_due = (double)$dueDocument->sum('amount');
            }

            $paymentDocument = SupplierPayment::where('supplier_uuid', '=', $supplier_uuid)->where('is_deleted', '=', 0);
            if ($paymentDocument->exists()) {
                $total_payment = (double)$paymentDocument->sum('paid_amount');
            }

            if ($total_due >= $total_payment) {
                $net_due = $total_due - $total_payment;
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Supplier Due"), ['due' => $net_due]);

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function supplierPaymentSummary(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $supplier_uuid = $request->input('supplier_uuid');
            $total_amount = 0;
            $total_due = 0;

            $supplier_payment_summary = SupplierPayment::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('supplier');

            if ($supplier_uuid != "") {
                $supplier_payment_summary = $supplier_payment_summary->where('supplier_uuid', '=', $supplier_uuid);
            }
            if ($user_uuid != "") {
                $supplier_payment_summary = $supplier_payment_summary->where('created_by_uuid', '=', $user_uuid);
            }
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $supplier_payment_summary = $supplier_payment_summary->get();

            foreach ($supplier_payment_summary as $purchase) {
                $total_amount = $total_amount + $purchase->paid_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.supplier_payment.supplier_payment_summary', compact('supplier_payment_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($uuid !== null) {
                $supplier_payment = SupplierPayment::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $supplier_payment->delete();
                } elseif ($supplier_payment->exists()) {
                    $supplier_payment = $supplier_payment->first();
                    $supplier_payment->is_deleted = 1;
                    $supplier_payment->deleted_at = date('Y-m-d H:i:s', time());
                    $supplier_payment->save();
                } else {
                    return Endpoint::endWith(false, "Sales Order Return not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Sales Order Return"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
