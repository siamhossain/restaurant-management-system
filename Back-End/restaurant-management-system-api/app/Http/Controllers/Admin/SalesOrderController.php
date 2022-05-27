<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\AccountingHandler;
use App\Http\Controllers\Admin\Classes\DueInvoiceHandler;
use App\Http\Controllers\Controller;
use App\Models\AccountingHistory;
use App\Models\Due;
use App\Models\Product;
use App\Models\PurchaseOrderParticular;
use App\Models\PurchaseOrderReturnParticular;
use App\Models\SalesOrder;
use App\Models\SalesOrderParticular;
use App\Models\SalesOrderReturnParticular;
use App\Models\StoreInformation;
use App\Models\User;
use App\Models\WastageParticular;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesOrderController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $sales_orders = SalesOrder::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('status', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $sales_orders->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $sales_orders = $sales_orders->skip($Offset)->take($RowsPerPage)->with('particulars')->with('customer')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales Order"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $sales_orders,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    public function salesFoodForKitchen(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');
            $status = (string)$request->input('status');
            $sales_orders = SalesOrder::where('is_deleted', '=', 0)->where('status', '=', $status)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $sales_orders->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $sales_orders = $sales_orders->skip($Offset)->take($RowsPerPage)->with('particulars')->with('customer')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Sales Order"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $sales_orders,
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
                $wastage = WastageParticular::where('product_uuid', '=', $product->uuid)->sum('qty');
                $purchase = PurchaseOrderParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $purchase_return = PurchaseOrderReturnParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $salse = SalesOrderParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $salse_return = SalesOrderReturnParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $stock = ((double)$purchase + (double)$salse_return) - ((double)$salse + (double)$purchase_return + (double)$wastage);
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
                    'stock' => $stock,
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
            $checkExistence = SalesOrder::where('uuid', '=', $uuid);
            $particulars = $request->input('particulars');
            if ($uuid != null && $checkExistence->exists()) {
                $sales_order = $checkExistence->first();
//                $sales_order->updated_by_uuid = auth()->user()->uuid;

            } else {
                $sales_order = new SalesOrder();
                $module_code = UAP::$MODULES['SALES_ORDER']['Code'];
                $prefix = UAP::$MODULES['SALES_ORDER']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $sales_order->code = $generated_doc_code;
//                $sales_order->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $sales_order->customer_uuid = (string)$request->input('customer_uuid');
            $sales_order->date = (string)$request->input('date');
            $sales_order->total_amount = (double)$request->input('total_amount');
            $sales_order->discount = (double)$request->input('discount');
            $sales_order->payable_amount = (double)$request->input('payable_amount');
            $sales_order->received_amount = (double)$request->input('received_amount');
            $sales_order->return_amount = (double)$request->input('return_amount');
            $sales_order->due_amount = (double)$request->input('due_amount');
            $sales_order->paid_amount = (double)$request->input('paid_amount');
            $sales_order->vat = (double)$request->input('vat');
            $sales_order->tax = (double)$request->input('tax');
            $sales_order->payment_type = (string)$request->input('payment_type');
            $sales_order->save();

            $sales_order_uuid = $sales_order->refresh()->uuid;

            if ($sales_order->save()) {
                SalesOrderParticular::where('sales_order_uuid', '=', $sales_order_uuid)->delete();

                foreach ($particulars as $particular) {
                    $sales_order_particular = new SalesOrderParticular();
                    $sales_order_particular->sales_order_uuid = (string)$sales_order_uuid;
                    $sales_order_particular->product_uuid = (string)$particular['product_uuid'];
                    $sales_order_particular->product_code = (string)$particular['product_code'];
                    $sales_order_particular->product_name = (string)$particular['product_name'];
                    $sales_order_particular->quantity = (double)$particular['quantity'];
                    $sales_order_particular->unit_price = (double)$particular['unit_price'];
                    $sales_order_particular->total_price = (double)$particular['total_price'];
                    $sales_order_particular->discount = (double)$particular['discount'];
                    $sales_order_particular->total_amount = (double)$particular['total_amount'];
                    $sales_order_particular->save();

                }

                if ($sales_order->payment_type === 'Cash' && (double)$sales_order->payable_amount > 0) {

                    Due::where('comment', '=', $sales_order->code)->delete();

                    if (AccountingHandler::autoEntryEnabled()) {
                        $accounting_settings = AccountingHandler::getSettings('cash_sales');
                        //return $accounting_settings;
                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => 1,
                            'comment' => $sales_order->code,
                            'account_category_uuid' => $accounting_settings->account_category_uuid,
                            'account_category_name' => $accounting_settings->account_category_name,
                            'account_head_uuid' => $accounting_settings->account_head_uuid,
                            'account_head_name' => $accounting_settings->account_head_name,
                            'type' => 'Income',
                            'total_amount' => $sales_order->payable_amount,
                            'date' => $sales_order->date,
                        ]);
                    }
                } elseif ($sales_order->payment_type == "Credit") {
                    //return "Ok";
                    if ((double)$sales_order->paid_amount > 0) {
                        if (AccountingHandler::autoEntryEnabled()) {
                            $accounting_settings = AccountingHandler::getSettings('cash_sales');
                            AccountingHandler::makeEntry([
                                'uuid' => '',
                                'is_auto_entry' => 1,
                                'comment' => $sales_order->code,
                                'account_category_uuid' => $accounting_settings->account_category_uuid,
                                'account_category_name' => $accounting_settings->account_category_name,
                                'account_head_uuid' => $accounting_settings->account_head_uuid,
                                'account_head_name' => $accounting_settings->account_head_name,
                                'type' => 'Income',
                                'total_amount' => $sales_order->paid_amount,
                                'date' => $sales_order->date,
                            ]);
                        }
                    } else {
                        // Delete the accounting history if have
                        AccountingHistory::where('comment', $sales_order->code)->delete();
                    }

                    if ((double)$sales_order->due_amount > 0) {
                        DueInvoiceHandler::createOrUpdateInvoice([
                            'uuid' => '',
                            'code' => '',
                            'comment' => $sales_order->code,
                            'date' => $sales_order->date,
                            'is_auto_entry' => 1,
                            'participant_type' => 'Customer',
                            'participant_uuid' => $sales_order->customer_uuid,
                            'amount' => (double)$sales_order->due_amount,
                        ]);
                    } else {
                        // Delete the due if has
                        Due::where('comment', '=', $sales_order->code)->delete();
                    }
                }


            }


            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Sales Order"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Sales Order"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function salesFoodStatusUpdateByKitchen(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            $status = $request->input('status');
            $food_list = SalesOrderParticular::where('uuid', '=', $uuid)->first();
            $food_list->status = $status;
            $food_list->save();

            return Endpoint::endWith(true, Endpoint::updatedMessage('Food'));
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
                $sales_orders = SalesOrder::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $sales_orders->delete();
                } elseif ($sales_orders->exists()) {
                    $sales_orders = $sales_orders->first();
                    $sales_orders->is_deleted = 1;
                    $sales_orders->deleted_at = date('Y-m-d H:i:s', time());
                    $sales_orders->save();

                    if ($sales_orders->save()) {
                        $particulars = SalesOrderParticular::where('sales_order_uuid', '=', $uuid)->get();

                        foreach ($particulars as $particular) {
                            $item =  SalesOrderParticular::where('uuid', '=', $particular->uuid)->first();
                            $item->is_deleted = 1;
                            $item->deleted_at = date('Y-m-d H:i:s', time());
                            $item->save();
                        }
                    }
                } else {
                    return Endpoint::endWith(false, "Sales Order not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Sales Order"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function salesSummary(Request $request)
    {
        try {
//            return $request->all();
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $sales_summary = SalesOrder::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('customer');

            if ($user_uuid != "") {
                $sales_summary = $sales_summary->where('created_by_uuid', '=', $user_uuid);
            }

            if ($customer_uuid != "") {
                $sales_summary = $sales_summary->where('customer_uuid', '=', $customer_uuid);
            }
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $sales_summary = $sales_summary->get();

            foreach ($sales_summary as $sales) {
                $total_amount = $total_amount + $sales->payable_amount;
                $total_due = $total_due + $sales->due_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.sales.sales_summary', compact('sales_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function salesDetails(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }
            $store_info = StoreInformation::first();
            $sales_order = SalesOrder::where('uuid', '=', $uuid)->with('customer')->with('sales_by')->first();
            $sales_order_particulars = SalesOrderParticular::where('sales_order_uuid', '=', $uuid)->get();
//            return $sales_order;
            return view('reports.invoice.sales_invoice', compact('sales_order', 'sales_order_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function salesOrderForDropdown(Request $request)
    {
        try {
            $search = $request->input('search_query');

            $sale_orders = SalesOrder::where('is_deleted', '=', 0)->when(trim($search) !== "", function ($q) use ($search) {
                return $q->where('customer_uuid', 'LIKE', '%' . $search . '%')->orWhere('document_date', 'LIKE', '%' . $search . '%')->with('customer_installment');
            })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Sales Orders'), $sale_orders);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
