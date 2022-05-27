<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\AccountingHandler;
use App\Http\Controllers\Controller;
use App\Models\CustomerPayment;
use App\Models\Due;
use App\Models\SalesOrder;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class CustomerPaymentController extends Controller
{

    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $customer_payments = CustomerPayment::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $customer_payments->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $customer_payments = $customer_payments->skip($Offset)->take($RowsPerPage)->with('customer')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales Order Return"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $customer_payments,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return CustomerPayment|string
     */

    public function save(Request $request)
    {
//        return $request->all();
        try {

            $uuid = (string)$request->input('uuid');

            $checkExistence = CustomerPayment::where('uuid', '=', $uuid);
            if ($uuid != null && $checkExistence->exists()) {
                $customer_payment = $checkExistence->first();
//                $customer_payment->updated_by_uuid = auth()->user()->uuid;
            } else {
                $customer_payment = new CustomerPayment();
                $module_code = UAP::$MODULES['CUSTOMER_PAYMENT']['Code'];
                $prefix = UAP::$MODULES['CUSTOMER_PAYMENT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $customer_payment->code = $generated_doc_code;
//                $customer_payment->created_by_uuid = auth()->user()->uuid;
                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }


            //return $reference;


            $customer_payment->date = (string)$request->input('date');
            $customer_payment->customer_uuid = (string)$request->input('customer_uuid');
            $customer_payment->reference = "Due Payment";
            $customer_payment->paid_amount = (double)$request->input('paid_amount');
            $customer_payment->prev_due_amount = (double)$request->input('customer_due');
            $customer_payment->note = (string)$request->input('note');
            $customer_payment->save();

            if ($customer_payment->save()) {
                if (AccountingHandler::autoEntryEnabled()) {
                    $accounting_setting = AccountingHandler::getSettings('customer_payment');

                    if ($accounting_setting) {

                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => true,
                            'account_category_uuid' => $accounting_setting->account_category_uuid,
                            'account_category_name' => $accounting_setting->account_category_name,
                            'account_head_uuid' => $accounting_setting->account_head_uuid,
                            'account_head_name' => $accounting_setting->account_head_name,
                            'type' => 'Income',
                            'comment' => $customer_payment->code,
                            'total_amount' => $customer_payment->paid_amount,
                            'date' => $customer_payment->date,
                        ]);
                    }
                }
            }


            return Endpoint::endWith(true, Endpoint::savedMessage(), $customer_payment->refresh()->uuid);
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
            $customer_uuid = (string)$request->input('customer_uuid');
            $net_due = 0;
            $total_due = 0;
            $total_payment = 0;

            $dueDocument = Due::where('participant_type', '=', 'Customer')->where('participant_uuid', '=', $customer_uuid)->where('is_deleted', '=', 0);
            if ($dueDocument->exists()) {
                $total_due = (double)$dueDocument->sum('amount');
            }

            $paymentDocument = CustomerPayment::where('customer_uuid', '=', $customer_uuid)->where('is_deleted', '=', 0);
            if ($paymentDocument->exists()) {
                $total_payment = (double)$paymentDocument->sum('paid_amount');
            }

            if ($total_due >= $total_payment) {
                $net_due = $total_due - $total_payment;
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Customer Due"), ['due' => $net_due]);

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function customerPaymentSummary(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $customer_payment_summary = CustomerPayment::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('customer');

            if ($customer_uuid != "") {
                $customer_payment_summary = $customer_payment_summary->where('customer_uuid', '=', $customer_uuid);
            }
            if ($user_uuid != "") {
                $customer_payment_summary = $customer_payment_summary->where('created_by_uuid', '=', $user_uuid);
            }
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $customer_payment_summary = $customer_payment_summary->get();

            foreach ($customer_payment_summary as $payment) {
                $total_amount = $total_amount + $payment->paid_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.customer_payment.customer_payment_summary', compact('customer_payment_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user', 'from_date', 'to_date'));
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
                $supplier_payment = CustomerPayment::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $supplier_payment->delete();
                } elseif ($supplier_payment->exists()) {
                    $supplier_payment = $supplier_payment->first();
                    $supplier_payment->is_deleted = 1;
                    $supplier_payment->deleted_at = date('Y-m-d H:i:s', time());
                    $supplier_payment->save();
                } else {
                    return Endpoint::endWith(false, "Customer Payment not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Customer Payment Return"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
