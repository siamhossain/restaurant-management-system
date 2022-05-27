<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use Exception;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request) {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $brands = Brand::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $brands->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $brands = $brands->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Brands"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $brands,
            ]);
        }catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function brandsForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $brands = Brand::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Brands'), $brands);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $slug = (string)$request->input('slug');

            if ($uuid != null) {
                $brand = Brand::where('uuid', '=', $uuid)->first();
//                $brand->updated_by_uuid = auth()->user()->uuid;
            } else {
                $brand = new Brand();
                $module_code = UAP::$MODULES['BRAND']['Code'];
                $prefix = UAP::$MODULES['BRAND']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $brand->code = $generated_doc_code;
//                $brand->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $brand->name = (string)$request->input('name');
            $brand->slug = $slug;
            $brand->is_featured = $request->input('is_featured');
            $brand->logo_uri = (string)$request->input('logo_uri');
            $brand->status = $request->input('status');
            $brand->save();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Brand"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Brand"));
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
            if (Helper::brandDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }

            if ($force === 1) {
                Brand::where('uuid', '=', $uuid)->delete();
            } else {
                $brand = Brand::where('uuid', '=', $uuid)->first();
                $brand->is_deleted = 1;
//                $brand->deleted_by_uuid = auth()->user()->uuid;
                $brand->deleted_at = date('Y-m-d H:i:s', time());
                $brand->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage('Brand'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * Check the slug existence and recommend some slugs
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkSlug(Request $request) {
        try {
            $uuid = (string)$request->input('uuid');
            $slug = (string) $request->input('slug');
            $suggestions = [];

            function checkSlugExistence($slug, $uuid = null) {
                return Brand::where('slug', '=', $slug)
                    ->when($uuid != null, function ($q) use($uuid) {
                        return $q->where('uuid', '<>', $uuid);
                    })
                    ->exists();
            }

            $slug_exists = checkSlugExistence($slug, $uuid);

            $checkSlugExistence = Brand::where('slug', '=', $slug);
            $checkExistence = Brand::where('uuid', '=', $uuid);

            if ($uuid != null && $checkExistence->exists()) {

                if ($slug_exists) {
                    $last_slug_search_total = Brand::where('slug', 'LIKE', '%' . $slug . '%')->count();
                    $_slug = $slug . "-" . ((int)$last_slug_search_total > 1 ? ((int)$last_slug_search_total + 1) : (int)$last_slug_search_total);

                    //push the default existing slug
                    array_push($suggestions, $checkExistence->first()->slug);

                    if(checkSlugExistence($_slug)) {
                        $slug = $slug . '-' . ((int)Brand::max('id') + 1);
                    } else {
                        $slug = $_slug;
                    }
                }

            } else {
                if ($checkSlugExistence->exists()) {
                    $last_slug_search_total = Brand::where('slug', 'LIKE', '%' . $slug . '%')->count();
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
}
