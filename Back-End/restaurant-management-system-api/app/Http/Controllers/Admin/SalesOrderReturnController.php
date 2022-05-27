<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\AccountingHandler;
use App\Http\Controllers\Admin\Classes\DueInvoiceHandler;
use App\Http\Controllers\Admin\Classes\PaymentEntryHandler;
use App\Http\Controllers\Controller;
use App\Models\AccountingHistory;
use App\Models\Due;
use App\Models\Product;
use App\Models\SalesOrderReturn;
use App\Models\SalesOrderReturnParticular;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesOrderReturnController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $sales_order_returns = SalesOrderReturn::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $sales_order_returns->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $sales_order_returns = $sales_order_returns->skip($Offset)->take($RowsPerPage)->with('particulars')->with('customer')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales Order Return"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $sales_order_returns,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    public function generateParticulars(Request $request)
    {
        try {
            $product_uuid = (string)$request->input('product_uuid');
            $particulars = [];

            $products = Product::where('uuid', $product_uuid)->with('media')->get();

            foreach ($products as $product) {
                array_push($particulars, [
                    'id' => 0,
                    'product_code' => $product->code,
                    'product_uuid' => $product->uuid,
                    'products_media' => $product->media,
                    'sales_order_uuid' => '',
                    'product_name' => $product->title,
                    'quantity' => 0,
                    'unit_price' => (double)$product->sales_price,
                    'discount' => 0,
                    'total_amount' => 0,
                ]);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales order particulars"), [
                'particulars' => $particulars,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
        try {
            DB::beginTransaction();
//            return $request->all();
            $uuid = $request->input('uuid');
            $checkExistence = SalesOrderReturn::where('uuid', '=', $uuid);
            $particulars = $request->input('particulars');
            if ($uuid != null && $checkExistence->exists()) {
                $sales_order_return = $checkExistence->first();
//                $sales_order_return->updated_by_uuid = auth()->user()->uuid;

            } else {
                $sales_order_return = new SalesOrderReturn();
                $module_code = UAP::$MODULES['SALES_ORDER_RETURN']['Code'];
                $prefix = UAP::$MODULES['SALES_ORDER_RETURN']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $sales_order_return->code = $generated_doc_code;
//                $sales_order_return->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $sales_order_return->customer_uuid = (string)$request->input('customer_uuid');
            $sales_order_return->date = (string)$request->input('date');
            $sales_order_return->total_amount = (double)$request->input('total_amount');
            $sales_order_return->discount = (double)$request->input('discount');
            $sales_order_return->payable_amount = (double)$request->input('payable_amount');
            $sales_order_return->received_amount = (double)$request->input('received_amount');
            $sales_order_return->return_amount = (double)$request->input('return_amount');
            $sales_order_return->due_amount = (double)$request->input('due_amount');
            $sales_order_return->paid_amount = (double)$request->input('paid_amount');
            $sales_order_return->vat = (double)$request->input('vat');
            $sales_order_return->tax = (double)$request->input('tax');
            $sales_order_return->payment_type = (string)$request->input('payment_type');
            $sales_order_return->save();

            $sales_order_return_uuid = $sales_order_return->refresh()->uuid;

            if ($sales_order_return->save()) {
                SalesOrderReturnParticular::where('sales_order_return_uuid', '=', $sales_order_return_uuid)->delete();

                foreach ($particulars as $particular) {
                    $sales_order_return_particular = new SalesOrderReturnParticular();
                    $sales_order_return_particular->sales_order_return_uuid = (string)$sales_order_return_uuid;
                    $sales_order_return_particular->product_uuid = (string)$particular['product_uuid'];
                    $sales_order_return_particular->product_code = (string)$particular['product_code'];
                    $sales_order_return_particular->product_name = (string)$particular['product_name'];
                    $sales_order_return_particular->quantity = (double)$particular['quantity'];
                    $sales_order_return_particular->unit_price = (double)$particular['unit_price'];
                    $sales_order_return_particular->total_price = (double)$particular['total_price'];
                    $sales_order_return_particular->discount = (double)$particular['discount'];
                    $sales_order_return_particular->total_amount = (double)$particular['total_amount'];
                    $sales_order_return_particular->save();

                }

                if ($sales_order_return->payment_type === 'Cash' && (double)$sales_order_return->payable_amount > 0)  {

                    Due::where('comment', '=', $sales_order_return->code)->delete();

                    if (AccountingHandler::autoEntryEnabled()) {
                        $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                        //return $accounting_settings;
                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => 1,
                            'comment' => $sales_order_return->code,
                            'account_category_uuid' => $accounting_settings->account_category_uuid,
                            'account_category_name' => $accounting_settings->account_category_name,
                            'account_head_uuid' => $accounting_settings->account_head_uuid,
                            'account_head_name' => $accounting_settings->account_head_name,
                            'type' => 'Expense',
                            'total_amount' => $sales_order_return->payable_amount,
                            'date' => $sales_order_return->date,
                        ]);
                    }
                } elseif($sales_order_return->payment_type == "Credit") {

                    if ((double)$request->input('due_amount') > 0) {
                        PaymentEntryHandler::CustomerPaymentHandler([
                            'uuid' => "",
                            'reference' => $sales_order_return->code,
                            "is_auto_entry" => true,
                            'date' => $sales_order_return->date,
                            'customer_uuid' => $sales_order_return->customer_uuid,
                            'paid_amount' => $sales_order_return->due_amount,
                            'note' => "Due Payment",
                            'customer_installment_uuid' => "",
                        ], false);
                    }
                    //return "Ok";
                    if((double)$sales_order_return->paid_amount > 0) {
                        if (AccountingHandler::autoEntryEnabled()) {
                            $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                            AccountingHandler::makeEntry([
                                'uuid' => '',
                                'is_auto_entry' => 1,
                                'comment' => $sales_order_return->code,
                                'account_category_uuid' => $accounting_settings->account_category_uuid,
                                'account_category_name' => $accounting_settings->account_category_name,
                                'account_head_uuid' => $accounting_settings->account_head_uuid,
                                'account_head_name' => $accounting_settings->account_head_name,
                                'type' => 'Expense',
                                'total_amount' => $sales_order_return->paid_amount,
                                'date' => $sales_order_return->date,
                            ]);
                        }
                    }else {
                        // Delete the accounting history if have
                        AccountingHistory::where('comment', $sales_order_return->code)->delete();
                    }

                    if((double)$sales_order_return->due_amount > 0) {
                        DueInvoiceHandler::createOrUpdateInvoice([
                            'uuid' => '',
                            'code' => '',
                            'comment' => $sales_order_return->code,
                            'date' => $sales_order_return->date,
                            'is_auto_entry' => 1,
                            'participant_type' => 'Customer',
                            'participant_uuid' => $sales_order_return->customer_uuid,
                            'amount' => (double)$sales_order_return->due_amount,
                        ]);
                    } else {
                        // Delete the due if has
                        Due::where('comment', '=', $sales_order_return->code)->delete();
                    }
                }



            }


            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Sales Order Return"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Sales Order Return"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($uuid !== null) {
                $sales_order_returns = SalesOrderReturn::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $sales_order_returns->delete();
                } elseif ($sales_order_returns->exists()) {
                    $sales_order_returns = $sales_order_returns->first();
                    $sales_order_returns->is_deleted = 1;
                    $sales_order_returns->deleted_at = date('Y-m-d H:i:s', time());
                    $sales_order_returns->save();

                    if ($sales_order_returns->save()) {
                        $particulars = SalesOrderReturnParticular::where('sales_order_return_uuid', '=', $uuid)->get();

                        foreach ($particulars as $particular) {
                            $item =  SalesOrderReturnParticular::where('uuid', '=', $particular->uuid)->first();
                            $item->is_deleted = 1;
                            $item->deleted_at = date('Y-m-d H:i:s', time());
                            $item->save();
                        }
                    }
                } else {
                    return Endpoint::endWith(false, "Sales Order Return not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Sales Order Return"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function salesReturnSummary(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $sales_return_summary = SalesOrderReturn::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('customer');

            if ((string)$user_uuid != "") {
                $sales_return_summary = $sales_return_summary->where('created_by_uuid', '=', $user_uuid);
            }

            if ((string)$customer_uuid != "") {
                $sales_return_summary = $sales_return_summary->where('customer_uuid', '=', $customer_uuid);
            }

            $sales_return_summary = $sales_return_summary->get();
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            foreach ($sales_return_summary as $sales) {
                $total_amount = $total_amount + $sales->total_amount;
                $total_due = $total_due + $sales->due_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.sales_return.sales_return_summary', compact('sales_return_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function salesReturnForDropdown(Request $request)
    {
        try {
            $search = $request->input('search_query');

            $sale_orders = SalesOrderReturn::where('is_deleted', '=', 0)->when(trim($search) !== "", function ($q) use ($search) {
                return $q->where('customer_uuid', 'LIKE', '%' . $search . '%')->orWhere('date', 'LIKE', '%' . $search . '%')->with('customer_installment');
            })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Sales Orders Returns'), $sale_orders);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function salesReturnDetails(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }

            $store_info = StoreInformation::first();
            $sales_order = SalesOrderReturn::where('uuid', '=', $uuid)->with('customer')->with('sales_by')->first();
//            if ($sales_order->exists()) {
//                $sales_order = $sales_order->
//            }

            $sales_order_particulars = SalesOrderReturnParticular::where('sales_order_return_uuid', '=', $uuid)->get();
            //return $sales_order;
            return view('reports.sales_return.sales_return_details', compact('sales_order', 'sales_order_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
