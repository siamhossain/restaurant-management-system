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
use App\Models\Ingredient;
use App\Models\IngredientPurchase;
use App\Models\IngredientPurchaseParticular;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IngredientPurchaseController extends Controller
{

    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $ingredient_purchases = IngredientPurchase::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('date', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $ingredient_purchases->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $ingredient_purchases = $ingredient_purchases->skip($Offset)->take($RowsPerPage)->with('particulars')->with('supplier')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Ingredients"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $ingredient_purchases,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function ingredientPurchaseDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $ingredients = IngredientPurchase::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Ingredient Purchase'), $ingredients);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    public function generateParticulars(Request $request)
    {
        try {
            $product_uuid = (string)$request->input('ingredient_uuid');
            $particulars = [];

            $ingredients = Ingredient::where('uuid', $product_uuid)->with('media')->get();

            foreach ($ingredients as $ingredient) {
                array_push($particulars, [
                    'id' => 0,
                    'ingredient_code' => $ingredient->code,
                    'product_uuid' => $ingredient->product_uuid,
                    'ingredient_uuid' => $ingredient->uuid,
                    'ingredients_media' => $ingredient->media,
                    'purchase_order_uuid' => '',
                    'ingredient_name' => $ingredient->title,
                    'quantity' => 0,
                    'unit_price' => (double)$ingredient->purchase_price,
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
            $checkExistence = IngredientPurchase::where('uuid', '=', $uuid);
            $particulars = $request->input('particulars');
            if ($uuid != null && $checkExistence->exists()) {
                $ingredient_purchase = $checkExistence->first();
//                $ingredient_purchase->updated_by_uuid = auth()->user()->uuid;

            } else {
                $ingredient_purchase = new IngredientPurchase();
                $module_code = UAP::$MODULES['INGREDIENT_PURCHASE']['Code'];
                $prefix = UAP::$MODULES['INGREDIENT_PURCHASE']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $ingredient_purchase->code = $generated_doc_code;
//                $ingredient_purchase->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $ingredient_purchase->supplier_uuid = (string)$request->input('supplier_uuid');
            $ingredient_purchase->date = (string)$request->input('date');
            $ingredient_purchase->total_amount = (double)$request->input('total_amount');
            $ingredient_purchase->discount = (double)$request->input('discount');
            $ingredient_purchase->payable_amount = (double)$request->input('payable_amount');
            $ingredient_purchase->received_amount = (double)$request->input('received_amount');
            $ingredient_purchase->return_amount = (double)$request->input('return_amount');
            $ingredient_purchase->due_amount = (double)$request->input('due_amount');
            $ingredient_purchase->paid_amount = (double)$request->input('paid_amount');
            $ingredient_purchase->vat = (double)$request->input('vat');
            $ingredient_purchase->tax = (double)$request->input('tax');
            $ingredient_purchase->payment_type = (string)$request->input('payment_type');
            $ingredient_purchase->save();

            $ingredient_purchase_uuid = $ingredient_purchase->refresh()->uuid;

            if ($ingredient_purchase->save()) {
                IngredientPurchaseParticular::where('ingredient_purchase_uuid', '=', $ingredient_purchase_uuid)->delete();

                foreach ($particulars as $particular) {
                    $purchase_particular = new IngredientPurchaseParticular();
                    $purchase_particular->ingredient_purchase_uuid = (string)$ingredient_purchase_uuid;
                    $purchase_particular->ingredient_uuid = (string)$particular['ingredient_uuid'];
                    $purchase_particular->ingredient_code = (string)$particular['ingredient_code'];
                    $purchase_particular->ingredient_name = (string)$particular['ingredient_name'];
                    $purchase_particular->quantity = (double)$particular['quantity'];
                    $purchase_particular->unit_price = (double)$particular['unit_price'];
                    $purchase_particular->total_price = (double)$particular['total_price'];
                    $purchase_particular->discount = (double)$particular['discount'];
                    $purchase_particular->total_amount = (double)$particular['total_amount'];
                    $purchase_particular->save();

                }

                if ($ingredient_purchase->payment_type === 'Cash' && (double)$ingredient_purchase->payable_amount > 0) {

                    Due::where('comment', '=', $ingredient_purchase->code)->delete();

                    if (AccountingHandler::autoEntryEnabled()) {
                        $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                        //return $accounting_settings;
                        AccountingHandler::makeEntry([
                            'uuid' => '',
                            'is_auto_entry' => 1,
                            'comment' => $ingredient_purchase->code,
                            'account_category_uuid' => $accounting_settings->account_category_uuid,
                            'account_category_name' => $accounting_settings->account_category_name,
                            'account_head_uuid' => $accounting_settings->account_head_uuid,
                            'account_head_name' => $accounting_settings->account_head_name,
                            'type' => 'Expense',
                            'total_amount' => $ingredient_purchase->payable_amount,
                            'date' => $ingredient_purchase->date,
                        ]);
                    }
                } elseif ($ingredient_purchase->payment_type == "credit") {
                    //return "Ok";
                    if ((double)$ingredient_purchase->paid_amount > 0) {
                        if (AccountingHandler::autoEntryEnabled()) {
                            $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                            AccountingHandler::makeEntry([
                                'uuid' => '',
                                'is_auto_entry' => 1,
                                'comment' => $ingredient_purchase->code,
                                'account_category_uuid' => $accounting_settings->account_category_uuid,
                                'account_category_name' => $accounting_settings->account_category_name,
                                'account_head_uuid' => $accounting_settings->account_head_uuid,
                                'account_head_name' => $accounting_settings->account_head_name,
                                'type' => 'Expense',
                                'total_amount' => $ingredient_purchase->paid_amount,
                                'date' => $ingredient_purchase->date,
                            ]);
                        }
                    } else {
                        // Delete the accounting history if have
                        AccountingHistory::where('comment', $ingredient_purchase->code)->delete();
                    }

                    if ((double)$ingredient_purchase->due_amount > 0) {
                        DueInvoiceHandler::createOrUpdateInvoice([
                            'uuid' => '',
                            'code' => '',
                            'comment' => $ingredient_purchase->code,
                            'date' => $ingredient_purchase->date,
                            'is_auto_entry' => 1,
                            'participant_type' => 'Supplier',
                            'participant_uuid' => $ingredient_purchase->supplier_uuid,
                            'amount' => (double)$ingredient_purchase->due_amount,
                        ]);
                    } else {
                        // Delete the due if has
                        Due::where('comment', '=', $ingredient_purchase->code)->delete();
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

    public function ingredientPurchaseSummary(Request $request)
    {
        try {
//            return $request->all();
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
//            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $ingredient_summary = IngredientPurchase::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('supplier');


            if ($user_uuid != "") {
                $ingredient_summary = $ingredient_summary->where('created_by_uuid', '=', $user_uuid);
            }

            /*if ($customer_uuid != "") {
                $ingredient_summary = $ingredient_summary->where('customer_uuid', '=', $customer_uuid);
            }*/
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $ingredient_summary = $ingredient_summary->get();

            foreach ($ingredient_summary as $ingredient) {
                $total_amount = $total_amount + $ingredient->payable_amount;
                $total_due = $total_due + $ingredient->due_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

//            return $ingredient_summary;

            return view('reports.ingredient_purchase_summary.ingredient_purchase_summary', compact('ingredient_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function ingredientPurchaseDetails(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }

            $store_info = StoreInformation::first();

            $purchase_order = IngredientPurchase::where('uuid', '=', $uuid)->with('supplier')->first();
            $purchase_order_particulars = IngredientPurchaseParticular::where('ingredient_purchase_uuid', '=', $purchase_order->uuid)->get();
//            return $purchase_order;
            return view('reports.ingredient_purchase_details.ingredient_purchase_details', compact('purchase_order', 'purchase_order_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    /**
     * For Data Delete
     * @param Request $request
     * @return JsonResponse|string
     */
    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                IngredientPurchase::where('uuid', '=', $uuid)->delete();
            } else {
                $ingredient_purchase = IngredientPurchase::where('uuid', '=', $uuid)->first();
                $ingredient_purchase->is_deleted = 1;
                $ingredient_purchase->deleted_by_uuid = auth()->user()->uuid;
                $ingredient_purchase->deleted_at = date ('Y-m-d H:i:s', time());
                $ingredient_purchase->save();

                if ($ingredient_purchase->save()) {
                    $particulars = IngredientPurchaseParticular::where('product_purchase_return_uuid', '=', $uuid)->get();

                    foreach ($particulars as $particular) {
                        $item =  IngredientPurchaseParticular::where('uuid', '=', $particular->uuid)->first();
                        $item->is_deleted = 1;
                        $item->deleted_at = date('Y-m-d H:i:s', time());
                        $item->save();
                    }
                }
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage("Due Invoice"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

}
