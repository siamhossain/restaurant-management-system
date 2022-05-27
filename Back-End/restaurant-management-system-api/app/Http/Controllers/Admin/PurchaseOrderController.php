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
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderParticular;
use App\Models\StoreInformation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseOrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $product_purchases = PurchaseOrder::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $product_purchases->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $product_purchases = $product_purchases->skip($Offset)->take($RowsPerPage)->with('particulars')->with('supplier')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Ingredients"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $product_purchases,
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

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Purchase order particulars"), [
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
            $checkExistence = PurchaseOrder::where('uuid', '=', $uuid);
            $particulars = $request->input('particulars');
            if ($uuid != null && $checkExistence->exists()) {
                $product_purchase = $checkExistence->first();
//                $product_purchase->updated_by_uuid = auth()->user()->uuid;

            } else {
                $product_purchase = new PurchaseOrder();
                $module_code = UAP::$MODULES['PURCHASE_ORDER']['Code'];
                $prefix = UAP::$MODULES['PURCHASE_ORDER']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $product_purchase->code = $generated_doc_code;
//                $product_purchase->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $product_purchase->supplier_uuid = (string)$request->input('supplier_uuid');
            $product_purchase->date = (string)$request->input('date');
            $product_purchase->total_amount = (double)$request->input('total_amount');
            $product_purchase->discount = (double)$request->input('discount');
            $product_purchase->payable_amount = (double)$request->input('payable_amount');
            $product_purchase->received_amount = (double)$request->input('received_amount');
            $product_purchase->return_amount = (double)$request->input('return_amount');
            $product_purchase->due_amount = (double)$request->input('due_amount');
            $product_purchase->paid_amount = (double)$request->input('paid_amount');
            $product_purchase->vat = (double)$request->input('vat');
            $product_purchase->tax = (double)$request->input('tax');
            $product_purchase->payment_type = (string)$request->input('payment_type');
            $product_purchase->save();

            $product_purchase_uuid = $product_purchase->refresh()->uuid;

            if ($product_purchase->save()) {
                PurchaseOrderParticular::where('product_purchase_uuid', '=', $product_purchase_uuid)->delete();

                foreach ($particulars as $particular) {
                    $purchase_particular = new PurchaseOrderParticular();
                    $purchase_particular->product_purchase_uuid = (string)$product_purchase_uuid;
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

                if ($product_purchase->payment_type === 'Cash' && (double)$product_purchase->payable_amount > 0) {

                    Due::where('comment', '=', $product_purchase->code)->delete();

                    if (AccountingHandler::autoEntryEnabled()) {
                        $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                        //return $accounting_settings;
                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => 1,
                            'comment' => $product_purchase->code,
                            'account_category_uuid' => $accounting_settings->account_category_uuid,
                            'account_category_name' => $accounting_settings->account_category_name,
                            'account_head_uuid' => $accounting_settings->account_head_uuid,
                            'account_head_name' => $accounting_settings->account_head_name,
                            'type' => 'Expense',
                            'total_amount' => $product_purchase->payable_amount,
                            'date' => $product_purchase->date,
                        ]);
                    }
                } elseif ($product_purchase->payment_type == "Credit") {
                    //return "Ok";
                    if ((double)$product_purchase->paid_amount > 0) {
                        if (AccountingHandler::autoEntryEnabled()) {
                            $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                            AccountingHandler::makeEntry([
                                'uuid' => '',
                                'is_auto_entry' => 1,
                                'comment' => $product_purchase->code,
                                'account_category_uuid' => $accounting_settings->account_category_uuid,
                                'account_category_name' => $accounting_settings->account_category_name,
                                'account_head_uuid' => $accounting_settings->account_head_uuid,
                                'account_head_name' => $accounting_settings->account_head_name,
                                'type' => 'Expense',
                                'total_amount' => $product_purchase->paid_amount,
                                'date' => $product_purchase->date,
                            ]);
                        }
                    } else {
                        // Delete the accounting history if have
                        AccountingHistory::where('comment', $product_purchase->code)->delete();
                    }

                    if ((double)$product_purchase->due_amount > 0) {
                        DueInvoiceHandler::createOrUpdateInvoice([
                            'uuid' => '',
                            'code' => '',
                            'comment' => $product_purchase->code,
                            'date' => $product_purchase->date,
                            'is_auto_entry' => 1,
                            'participant_type' => 'Supplier',
                            'participant_uuid' => $product_purchase->supplier_uuid,
                            'amount' => (double)$product_purchase->due_amount,
                        ]);
                    } else {
                        // Delete the due if has
                        Due::where('comment', '=', $product_purchase->code)->delete();
                    }
                }


            }


            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Ingredient Purchase"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Ingredient Purchase"));
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
                $product_purchases = PurchaseOrder::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $product_purchases->delete();
                } elseif ($product_purchases->exists()) {
                    $product_purchases = $product_purchases->first();
                    $product_purchases->is_deleted = 1;
                    $product_purchases->deleted_at = date('Y-m-d H:i:s', time());
                    $product_purchases->save();

                    if ($product_purchases->save()) {
                        $particulars = PurchaseOrderParticular::where('product_purchase_uuid', '=', $uuid)->get();

                        foreach ($particulars as $particular) {
                            $item =  PurchaseOrderParticular::where('uuid', '=', $particular->uuid)->first();
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

    public function purchaseSummary(Request $request)
    {

        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $supplier_uuid = $request->input('supplier_uuid');
            $user_uuid = $request->input('user_uuid');


            $store_info = StoreInformation::first();

            $total_amount = 0;



            $purchase_summary = PurchaseOrder::where('is_deleted', '=', 0)->whereBetween('date', [$from_date, $to_date]);

            if ((string)$supplier_uuid !== '') {
                $purchase_summary = $purchase_summary->where('supplier_uuid', '=', $supplier_uuid);
            }

            if ((string)$user_uuid !== '') {
                $purchase_summary = $purchase_summary->where('created_by_uuid', '=', $user_uuid);
            }

            $purchase_summary = $purchase_summary->with('particulars')->get();

            foreach ($purchase_summary as $summary) {
                $total_amount = $total_amount + $summary->payable_amount;
            }

//            return $purchase_summary;
            return view('reports.purchase.purchaseSummary.purchase_report', compact('store_info', 'purchase_summary', 'total_amount'));



        } catch (Exception $exception) {
            return $exception->getMessage()
;        }
    }

    public function purchaseOrderForDropdown()
    {
        try {
            $purchase_orders = PurchaseOrder::where('is_deleted', '=', 0)->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Purchase Order'), $purchase_orders);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function purchaseDetails(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }

            $store_info = StoreInformation::first();

            $purchase_order = PurchaseOrder::where('uuid', '=', $uuid)->with('supplier')->first();
            $purchase_order_particulars = PurchaseOrderParticular::where('product_purchase_uuid', '=', $purchase_order->uuid)->get();
//            return $purchase_order;
            return view('reports.purchase.purchaseDetails.purchase_details', compact('purchase_order', 'purchase_order_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

}
