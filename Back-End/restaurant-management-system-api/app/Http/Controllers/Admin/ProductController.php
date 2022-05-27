<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductMedia;
use App\Models\PurchaseOrderParticular;
use App\Models\PurchaseOrderReturnParticular;
use App\Models\SalesOrder;
use App\Models\SalesOrderParticular;
use App\Models\SalesOrderReturnParticular;
use App\Models\WastageParticular;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $products = Product::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('title', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $products->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $products = $products->skip($Offset)->take($RowsPerPage)->with('category')->with('brand')->with('unit')->with('media')->get();

            foreach ($products as $product) {
                $wastage = WastageParticular::where('product_uuid', '=', $product->uuid)->sum('qty');
                $purchase = PurchaseOrderParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $purchase_return = PurchaseOrderReturnParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $salse = SalesOrderParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $salse_return = SalesOrderReturnParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $product->total_stock = ((double)$purchase + (double)$salse_return) - ((double)$salse + (double)$purchase_return + (double)@$wastage);

                if ($product->total_stock < 0) {
                    $product->total_stock = 0;
                }
            }


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Products"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $products,
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
            $sku_entry = Product::where('sku', '=', $sku)->when($uuid != null, function ($q) use ($uuid) {
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
                return Product::where('slug', '=', $slug)
                    ->when($uuid != null, function ($q) use ($uuid) {
                        return $q->where('uuid', '<>', $uuid);
                    })
                    ->exists();
            }

            $slug_exists = checkSlugExistence($slug, $uuid);

            $checkSlugExistence = Product::where('slug', '=', $slug);
            $checkExistence = Product::where('uuid', '=', $uuid);

            if ($uuid != null && $checkExistence->exists()) {

                if ($slug_exists) {
                    $last_slug_search_total = Product::where('slug', 'LIKE', '%' . $slug . '%')->count();
                    $_slug = $slug . "-" . ((int)$last_slug_search_total > 1 ? ((int)$last_slug_search_total + 1) : (int)$last_slug_search_total);

                    //push the default existing slug
                    array_push($suggestions, $checkExistence->first()->slug);

                    if (checkSlugExistence($_slug)) {
                        $slug = $slug . '-' . ((int)Product::max('id') + 1);
                    } else {
                        $slug = $_slug;
                    }
                }

            } else {
                if ($checkSlugExistence->exists()) {
                    $last_slug_search_total = Product::where('slug', 'LIKE', '%' . $slug . '%')->count();
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

    /**
     * For Dropdown Data
     * @return Product[]|\Illuminate\Database\Eloquent\Collection|string
     */
    public function productForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');

            $products = Product::where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('title', 'LIKE', '%' . $search_query . '%')->orWhere('category_uuid', 'LIKE', '%' . $search_query . '%');
                })
                ->get();

            foreach ($products as $product) {
                $wastage = WastageParticular::where('product_uuid', '=', $product->uuid)->sum('qty');
                $purchase = PurchaseOrderParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $purchase_return = PurchaseOrderReturnParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $salse = SalesOrderParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $salse_return = SalesOrderReturnParticular::where('product_uuid', '=', $product->uuid)->where('is_deleted', '=', 0)->sum('quantity');
                $product->stock = ((double)$purchase + (double)$salse_return) - ((double)$salse + (double)$purchase_return + (double)$wastage) ;
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Products"), $products);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     *  Product Save Method
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse
     */

    public function save(Request $request)
    {
        try {
            DB::beginTransaction();
//            return $request->all();
            $uuid = $request->input('uuid');
            $checkExistence = Product::where('uuid', '=', $uuid);
            $medias = $request->input('media');
            if ($uuid != null && $checkExistence->exists()) {
                $product = $checkExistence->first();
//                $product->updated_by_uuid = auth()->user()->uuid;

            } else {
                $product = new Product();
                $module_code = UAP::$MODULES['PRODUCT']['Code'];
                $prefix = UAP::$MODULES['PRODUCT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $product->code = $generated_doc_code;
//                $product->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $product->title = (string)$request->input('title');
            $product->brand_uuid = (string)$request->input('brand_uuid');
            $product->category_uuid = (string)$request->input('category_uuid');
            $product->unit_uuid = (string)$request->input('unit_uuid');
            $product->description = (string)$request->input('description');
            $product->featured_image_uri = (string)$request->input('featured_image_uri');
            $product->featured_video_id = (string)$request->input('featured_video_id');
            $product->min_stock = (int)$request->input('min_stock');
            $product->purchase_price = (int)$request->input('purchase_price');
            $product->sales_price = (int)$request->input('sales_price');
            $product->sku = (string)$request->input('sku');
            $product->barcode = (string)$request->input('barcode');
            $product->slug = (string)$request->input('slug');
            $product->status = (string)$request->input('status');
            $product->tax = (int)$request->input('tax');
            $product->vat = (int)$request->input('vat');
            $product->save();

            $product_uuid = $product->refresh()->uuid;

            //return $product_uuid;

            if ($product->save()) {
//                Existing Product Media Delete
                ProductMedia::where('product_uuid', '=', $product_uuid)->delete();

                foreach ($medias as $media) {
                    $product_media = new ProductMedia();
                    $product_media->product_uuid = $product_uuid;
                    $product_media->product_image_uri = $media;
                    $product_media->save();
                }
            }

            DB::commit();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Product"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Product"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getProductByUuid(Request $request) {
        try {
            $uuid = $request->input('uuid');

            $product = Product::where('uuid', '=', $uuid);
            if ($product->exists()) {
                $product = $product->first();
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage('Product'), $product);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
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

            if (Helper::productDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }

            if ($force === 1) {
                Product::where('uuid', '=', $uuid)->delete();
            } else {
                $category = Product::where('uuid', '=', $uuid)->first();
                $category->is_deleted = 1;
                $category->deleted_by_uuid = auth()->user()->uuid;
                $category->deleted_at = date ('Y-m-d H:i:s', time());
                $category->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage("Category"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
