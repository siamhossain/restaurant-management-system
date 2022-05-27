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
use App\Models\PurchaseOrderReturn;
use App\Models\PurchaseOrderReturnParticular;
use App\Models\SupplierPayment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\StoreInformation;

class PurchaseOrderReturnController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $product_purchaseReturn = PurchaseOrderReturn::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $product_purchaseReturn->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $product_purchaseReturn = $product_purchaseReturn->skip($Offset)->take($RowsPerPage)->with('particulars')->with('supplier')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Ingredients"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $product_purchaseReturn,
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
                    'purchase_order_uuid' => '',
                    'product_name' => $product->title,
                    'quantity' => 0,
                    'unit_price' => (double)$product->purchase_price,
                    'discount' => 0,
                    'total_amount' => 0,
                ]);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Purchase order return particulars"), [
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
            $checkExistence = PurchaseOrderReturn::where('uuid', '=', $uuid);
            $particulars = $request->input('particulars');
            if ($uuid != null && $checkExistence->exists()) {
                $product_purchaseReturn = $checkExistence->first();
//                $product_purchaseReturn->updated_by_uuid = auth()->user()->uuid;

            } else {
                $product_purchaseReturn = new PurchaseOrderReturn();
                $module_code = UAP::$MODULES['PURCHASE_ORDER_RETURN']['Code'];
                $prefix = UAP::$MODULES['PURCHASE_ORDER_RETURN']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $product_purchaseReturn->code = $generated_doc_code;
//                $product_purchaseReturn->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $product_purchaseReturn->supplier_uuid = (string)$request->input('supplier_uuid');
            $product_purchaseReturn->date = (string)$request->input('date');
            $product_purchaseReturn->total_amount = (double)$request->input('total_amount');
            $product_purchaseReturn->discount = (double)$request->input('discount');
            $product_purchaseReturn->payable_amount = (double)$request->input('payable_amount');
            $product_purchaseReturn->received_amount = (double)$request->input('received_amount');
            $product_purchaseReturn->return_amount = (double)$request->input('return_amount');
            $product_purchaseReturn->due_amount = (double)$request->input('due_amount');
            $product_purchaseReturn->paid_amount = (double)$request->input('paid_amount');
            $product_purchaseReturn->vat = (double)$request->input('vat');
            $product_purchaseReturn->tax = (double)$request->input('tax');
            $product_purchaseReturn->payment_type = (string)$request->input('payment_type');
            $product_purchaseReturn->save();

            $product_purchase_return_uuid = $product_purchaseReturn->refresh()->uuid;

            if ($product_purchaseReturn->save()) {
                PurchaseOrderReturnParticular::where('product_purchase_return_uuid', '=', $product_purchase_return_uuid)->delete();

                foreach ($particulars as $particular) {
                    $purchase_particular = new PurchaseOrderReturnParticular();
                    $purchase_particular->product_purchase_return_uuid = (string)$product_purchase_return_uuid;
                    $purchase_particular->product_uuid = (string)$particular['product_uuid'];
                    $purchase_particular->product_code = (string)$particular['product_code'];
                    $purchase_particular->product_name = (string)$particular['product_name'];
                    $purchase_particular->quantity = (double)$particular['quantity'];
                    $purchase_particular->unit_price = (double)$particular['unit_price'];
                    $purchase_particular->total_price = (double)$particular['total_price'];
                    $purchase_particular->discount = (double)$particular['discount'];
                    $purchase_particular->total_amount = (double)$particular['total_amount'];
                    $purchase_particular->save();

                }

                if ($product_purchaseReturn->payment_type === 'Cash' && (double)$product_purchaseReturn->payable_amount > 0)  {

                    Due::where('comment', '=', $product_purchaseReturn->code)->delete();

                    if (AccountingHandler::autoEntryEnabled()) {
                        $accounting_settings = AccountingHandler::getSettings('cash_sales');
                        //return $accounting_settings;
                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => 1,
                            'comment' => $product_purchaseReturn->code,
                            'account_category_uuid' => $accounting_settings->account_category_uuid,
                            'account_category_name' => $accounting_settings->account_category_name,
                            'account_head_uuid' => $accounting_settings->account_head_uuid,
                            'account_head_name' => $accounting_settings->account_head_name,
                            'type' => 'Income',
                            'total_amount' => $product_purchaseReturn->payable_amount,
                            'date' => $product_purchaseReturn->date,
                        ]);
                    }
                } elseif($product_purchaseReturn->payment_type == "Credit") {
                    //return "Ok";
                    if((double)$product_purchaseReturn->paid_amount > 0) {
                        if (AccountingHandler::autoEntryEnabled()) {
                            $accounting_settings = AccountingHandler::getSettings('supplier_payment');
                            AccountingHandler::makeEntry([
                                'uuid' => '',
                                'is_auto_entry' => 1,
                                'comment' => $product_purchaseReturn->code,
                                'account_category_uuid' => $accounting_settings->account_category_uuid,
                                'account_category_name' => $accounting_settings->account_category_name,
                                'account_head_uuid' => $accounting_settings->account_head_uuid,
                                'account_head_name' => $accounting_settings->account_head_name,
                                'type' => 'Expense',
                                'total_amount' => $product_purchaseReturn->paid_amount,
                                'date' => $product_purchaseReturn->date,
                            ]);
                        }
                    }else {
                        // Delete the accounting history if have
                        AccountingHistory::where('comment', $product_purchaseReturn->code)->delete();
                    }

                    if((double)$product_purchaseReturn->due_amount > 0) {
                        PaymentEntryHandler::SupplierPaymentHandler([
                            'uuid' => "",
                            'reference' => $product_purchaseReturn->code,
                            "is_auto_entry" => true,
                            'date' => $product_purchaseReturn->date,
                            'supplier_uuid' => $product_purchaseReturn->supplier_uuid,
                            'paid_amount' => $product_purchaseReturn->due_amount,
                            'note' => "Due Payment",
                        ], false);
                    } else {
                        // Delete the due if has
                        SupplierPayment::where('reference', '=', $product_purchaseReturn->code)->delete();
                    }
                }



            }


            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Purchase Return"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Purchase Return"));
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
                $product_purchaseReturn = PurchaseOrderReturn::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $product_purchaseReturn->delete();
                } elseif ($product_purchaseReturn->exists()) {
                    $product_purchaseReturn = $product_purchaseReturn->first();
                    $product_purchaseReturn->is_deleted = 1;
                    $product_purchaseReturn->deleted_at = date('Y-m-d H:i:s', time());
                    $product_purchaseReturn->save();

                    if ($product_purchaseReturn->save()) {
                        $particulars = PurchaseOrderReturnParticular::where('product_purchase_return_uuid', '=', $uuid)->get();

                        foreach ($particulars as $particular) {
                            $item =  PurchaseOrderReturnParticular::where('uuid', '=', $particular->uuid)->first();
                            $item->is_deleted = 1;
                            $item->deleted_at = date('Y-m-d H:i:s', time());
                            $item->save();
                        }
                    }

                } else {
                    return Endpoint::endWith(false, "Purchase Order Return not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Purchase Order Return"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function purchaseReturnSummary(Request $request)
    {

        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $supplier_uuid = $request->input('supplier_uuid');
            $user_uuid = $request->input('user_uuid');


            $store_info = StoreInformation::first();

            $total_amount = 0;
            $total_due = 0;



            $purchase_return_summary = PurchaseOrderReturn::where('is_deleted', '=', 0)->whereBetween('date', [$from_date, $to_date]);

            if ((string)$supplier_uuid !== '') {
                $purchase_return_summary = $purchase_return_summary->where('supplier_uuid', '=', $supplier_uuid);
            }

            if ((string)$user_uuid !== '') {
                $purchase_return_summary = $purchase_return_summary->where('created_by_uuid', '=', $user_uuid);
            }

            $purchase_return_summary = $purchase_return_summary->with('particulars')->get();

            foreach ($purchase_return_summary as $purchase) {
                $total_amount = $total_amount + $purchase->payment_amount;
                $total_due = $total_due + $purchase->due_amount;
            }

//            return $purchase_return_summary['particulars'];
            return view('reports.purchase.purchaseReturnSummary.purchase_return_summary_report', compact('store_info', 'purchase_return_summary', 'total_amount'));



        } catch (Exception $exception) {
            return $exception->getMessage()
                ;        }
    }

    public function purchaseOrderReturnForDropdown()
    {
        try {
            $purchase_return_orders = PurchaseOrderReturn::where('is_deleted', '=', 0)->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Purchase Order Return'), $purchase_return_orders);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function purchaseReturnDetails(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }

            $store_info = StoreInformation::first();

            $purchase_order_return = PurchaseOrderReturn::where('uuid', '=', $uuid)->with('supplier')->first();
            $purchase_order_particulars_return = PurchaseOrderReturnParticular::where('product_purchase_return_uuid', '=', $purchase_order_return->uuid)->get();
//            return $purchase_order;
            return view('reports.purchase.purchaseReturnDetails.purchase_return_details', compact('purchase_order_return', 'purchase_order_particulars_return', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }


}
