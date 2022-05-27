<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\IngredientPurchase;
use App\Models\IngredientPurchaseParticular;
use App\Models\IngredientUse;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Hamcrest\Core\JavaForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IngredientUsesController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $ingredients = IngredientUse::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $ingredients->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $ingredients = $ingredients->skip($Offset)->take($RowsPerPage)->with('ingredient')->get();

            foreach ($ingredients as $ingredient) {
                $ingredient->stock = IngredientPurchaseParticular::where('ingredient_uuid', '=', $ingredient->uuid)->sum('quantity');
            }


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Ingredients"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $ingredients,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    public function saveUses(Request $request)
    {
        try {
            DB::beginTransaction();
//            return $request->all();
            $uuid = $request->input('uuid');
            $checkExistence = IngredientUse::where('uuid', '=', $uuid);
            if ($uuid != null && $checkExistence->exists()) {
                $ingredient = $checkExistence->first();
//                $ingredient_purchase_summary->updated_by_uuid = auth()->user()->uuid;

            } else {
                $ingredient = new IngredientUse();
                $module_code = UAP::$MODULES['INGREDIENT_USES']['Code'];
                $prefix = UAP::$MODULES['INGREDIENT_USES']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $ingredient->code = $generated_doc_code;
//                $ingredient_purchase_summary->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $ingredient->date = $request->input('date');
            $ingredient->ingredient_uuid = $request->input('ingredient_uuid');
            $ingredient->quantity = $request->input('quantity');
            $ingredient->save();


            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Ingredient Uses"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Ingredient Uses"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function checkStock(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            $stock = IngredientPurchaseParticular::where('ingredient_uuid', '=', $uuid)->sum('quantity');
            $uses = IngredientUse::where('ingredient_uuid', '=', $uuid)->sum('quantity');

            $total_stock = 0;

            if ((double)$stock > (double)$uses) {
                $total_stock = $stock - $uses;
            }
            return Endpoint::endWith(true, 'Stock Check Successfully!', $total_stock);
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
                $customer = IngredientUse::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $customer->delete();
                } elseif ($customer->exists()) {
                    $customer = $customer->first();
                    $customer->is_deleted = 1;
                    $customer->deleted_at = date('Y-m-d H:i:s', time());
                    $customer->save();
                } else {
                    return Endpoint::endWith(false, "Ingredient uses not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Ingredient uses"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function ingredientUsesSummary(Request $request)
    {
        try {
//            return $request->all();
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
//            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $ingredient_uses_summary = IngredientUse::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('supplier');


            if ($user_uuid != "") {
                $ingredient_uses_summary = $ingredient_uses_summary->where('created_by_uuid', '=', $user_uuid);
            }

            /*if ($customer_uuid != "") {
                $ingredient_uses_summary = $ingredient_uses_summary->where('customer_uuid', '=', $customer_uuid);
            }*/
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $ingredient_uses_summary = $ingredient_uses_summary->get();

            foreach ($ingredient_uses_summary as $ingredient) {
                $total_amount = $total_amount + $ingredient->payable_amount;
                $total_due = $total_due + $ingredient->due_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

//            return $ingredient_uses_summary;

            return view('reports.ingredient_uses_summary.ingredient_uses_summary', compact('ingredient_uses_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function ingredientUsesDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $ingredients = IngredientUse::where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Ingredient Uses'), $ingredients);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function ingredientUsesDetails(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }

            $store_info = StoreInformation::first();

            $purchase_order = IngredientUse::where('uuid', '=', $uuid)->with('supplier')->first();
            $purchase_order_particulars = IngredientPurchaseParticular::where('ingredient_purchase_uuid', '=', $purchase_order->uuid)->get();
//            return $purchase_order;
            return view('reports.ingredient_uses_details.ingredient_uses_details', compact('purchase_order', 'purchase_order_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
