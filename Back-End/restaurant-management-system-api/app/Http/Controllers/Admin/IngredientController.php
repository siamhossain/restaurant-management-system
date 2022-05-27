<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Models\Ingredient;
use App\Models\IngredientMedia;
use App\Models\IngredientPurchaseParticular;
use App\Models\IngredientUse;
use App\Models\SalesOrder;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class IngredientController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $ingredients = Ingredient::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('title', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $ingredients->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $ingredients = $ingredients->skip($Offset)->take($RowsPerPage)->with('category')->with('unit')->with('media')->get();

            foreach ($ingredients as $ingredient) {
                $uses = IngredientUse::where('ingredient_uuid', '=', $ingredient->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $stock = IngredientPurchaseParticular::where('ingredient_uuid', '=', $ingredient->uuid)->sum('quantity');
                $ingredient->stock = (double)$stock - (double)$uses;
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


    /**
     *  Check the product sku duplicate entry
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkSkuExistence(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $sku = (string)$request->input('sku');
            $sku_entry = Ingredient::where('sku', '=', $sku)->when($uuid != null, function ($q) use ($uuid) {
                return $q->where('uuid', '<>', $uuid);
            });

            if ($sku_entry->exists()) {
                return Endpoint::endWith(true, "Duplicate SKU entry!", [
                    'sku_exists' => true,
                ]);
            }

            return Endpoint::endWith(true, "Your SKU is valid!", [
                'sku_exists' => false,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * Check the slug existence and recommend some slugs
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkSlug(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $slug = (string)$request->input('slug');
            $suggestions = [];

            function checkSlugExistence($slug, $uuid = null)
            {
                return Ingredient::where('slug', '=', $slug)
                    ->when($uuid != null, function ($q) use ($uuid) {
                        return $q->where('uuid', '<>', $uuid);
                    })
                    ->exists();
            }

            $slug_exists = checkSlugExistence($slug, $uuid);

            $checkSlugExistence = Ingredient::where('slug', '=', $slug);
            $checkExistence = Ingredient::where('uuid', '=', $uuid);

            if ($uuid != null && $checkExistence->exists()) {

                if ($slug_exists) {
                    $last_slug_search_total = Ingredient::where('slug', 'LIKE', '%' . $slug . '%')->count();
                    $_slug = $slug . "-" . ((int)$last_slug_search_total > 1 ? ((int)$last_slug_search_total + 1) : (int)$last_slug_search_total);

                    //push the default existing slug
                    array_push($suggestions, $checkExistence->first()->slug);

                    if (checkSlugExistence($_slug)) {
                        $slug = $slug . '-' . ((int)Ingredient::max('id') + 1);
                    } else {
                        $slug = $_slug;
                    }
                }

            } else {
                if ($checkSlugExistence->exists()) {
                    $last_slug_search_total = Ingredient::where('slug', 'LIKE', '%' . $slug . '%')->count();
                    $slug = $slug . "-" . (int)$last_slug_search_total;
                }
            }

            //push the generated slu
            array_push($suggestions, $slug);

            return Endpoint::endWith(true, "Slug checkpoint result fetched successfully.", [
                'exists' => $slug_exists,
                'suggestions' => $suggestions,
            ]);

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function ingredientForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $ingredients = Ingredient::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Ingredient'), $ingredients);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     *  Ingredient Save Method
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse
     */

    public function save(Request $request)
    {
        try {
            DB::beginTransaction();
//            return $request->all();
            $uuid = $request->input('uuid');
            $checkExistence = Ingredient::where('uuid', '=', $uuid);
            $medias = $request->input('media');
            if ($uuid != null && $checkExistence->exists()) {
                $ingredient = $checkExistence->first();
//                $ingredient_purchase_summary->updated_by_uuid = auth()->user()->uuid;

            } else {
                $ingredient = new Ingredient();
                $module_code = UAP::$MODULES['INGREDIENT']['Code'];
                $prefix = UAP::$MODULES['INGREDIENT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $ingredient->code = $generated_doc_code;
//                $ingredient_purchase_summary->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $ingredient->title = $request->input('title');
            $ingredient->category_uuid = $request->input('category_uuid');
            $ingredient->unit_uuid = $request->input('unit_uuid');
            $ingredient->description = $request->input('description');
            $ingredient->featured_image_uri = $request->input('featured_image_uri');
            $ingredient->featured_video_id = $request->input('featured_video_id');
            $ingredient->min_stock = $request->input('min_stock');
            $ingredient->purchase_price = $request->input('purchase_price');
            $ingredient->sku = $request->input('sku');
            $ingredient->barcode = $request->input('barcode');
            $ingredient->slug = $request->input('slug');
            $ingredient->status = $request->input('status');
            $ingredient->save();

            $ingredient_uuid = $ingredient->refresh()->uuid;

            //return $ingredient_uuid;

            if ($ingredient->save()) {
//                Existing Ingredient Media Delete
                IngredientMedia::where('ingredient_uuid', '=', $ingredient_uuid)->delete();

                foreach ($medias as $media) {
                    $ingredient_media = new IngredientMedia();
                    $ingredient_media->ingredient_uuid = $ingredient_uuid;
                    $ingredient_media->ingredient_image_uri = $media;
                    $ingredient_media->save();
                }
            }

            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Ingredient"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Ingredient"));
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

            if (Helper::ingredientDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }
            if ($uuid !== null) {
                $customer = Ingredient::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $customer->delete();
                } elseif ($customer->exists()) {
                    $customer = $customer->first();
                    $customer->is_deleted = 1;
                    $customer->deleted_at = date('Y-m-d H:i:s', time());
                    $customer->save();
                } else {
                    return Endpoint::endWith(false, "Ingredient not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Ingredient"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /*public function ingredientSummary(Request $request)
    {
        try {
//            return $request->all();
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $customer_uuid = $request->input('customer_uuid');
            $total_amount = 0;
            $total_due = 0;

            $ingredient_summary = Ingredient::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->with('customer');

            if ($user_uuid != "") {
                $ingredient_summary = $ingredient_summary->where('created_by_uuid', '=', $user_uuid);
            }

            if ($customer_uuid != "") {
                $ingredient_summary = $ingredient_summary->where('customer_uuid', '=', $customer_uuid);
            }
            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $ingredient_summary = $ingredient_summary->get();

            foreach ($ingredient_summary as $sales) {
                $total_amount = $total_amount + $sales->payable_amount;
                $total_due = $total_due + $sales->due_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.sales.sales_summary', compact('ingredient_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }*/


}
