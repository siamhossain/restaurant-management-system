<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');

            $categories = Category::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%');
            })->when(trim($search_query) == "", function ($q) {
                return $q->where('parent_cat_uuid', '=', '')->orWhere('parent_cat_uuid', '=', null);
            })->get();

            foreach ($categories as $category) {
                $category->sub_categories = $this->getSubCategories($category->uuid, false);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Categories"), $categories);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Dropdown Data
     * @param Request $request
     * @return Category[]|Collection|string
     */
    public function categoriesForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $categories = Category::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->when(trim($search_query) == "", function ($q) {
                    return $q->where('parent_cat_uuid', '=', '')->orWhere('parent_cat_uuid', '=', null);
                })->get();

            foreach ($categories as $category) {
                $category->sub_categories = $this->getSubCategories($category->uuid);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Categories"), $categories);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getSubCategories($category_uuid, $checkStatus = true)
    {
        $categories = [];

        $sub_categories = Category::where('is_deleted', '=', 0)->where('parent_cat_uuid', '=', $category_uuid)
            ->when($checkStatus, function($q) {
                return $q->where('status', '=', 'Active');
            });
        if ($sub_categories->exists()) {
            $categories = $sub_categories->get();

            foreach ($categories as $category) {
                $category->sub_categories = $this->getSubCategories($category->uuid, $checkStatus);
            }
        }

        return $categories;
    }


    /**
     * Check the slug existence and recommend some slugs
     * @param Request $request
     * @return JsonResponse
     */
    public function checkSlug(Request $request) {
        try {
            $uuid = (string)$request->input('uuid');
            $slug = (string) $request->input('slug');
            $suggestions = [];

            function checkSlugExistence($slug, $uuid = null) {
                return Category::where('slug', '=', $slug)
                    ->when($uuid != null, function ($q) use($uuid) {
                        return $q->where('uuid', '<>', $uuid);
                    })
                    ->exists();
            }

            $slug_exists = checkSlugExistence($slug, $uuid);

            $checkSlugExistence = Category::where('slug', '=', $slug);
            $checkExistence = Category::where('uuid', '=', $uuid);

            if ($uuid != null && $checkExistence->exists()) {

                if ($slug_exists) {
                    $last_slug_search_total = Category::where('slug', 'LIKE', '%' . $slug . '%')->count();
                    $_slug = $slug . "-" . ((int)$last_slug_search_total > 1 ? ((int)$last_slug_search_total + 1) : (int)$last_slug_search_total);

                    //push the default existing slug
                    array_push($suggestions, $checkExistence->first()->slug);

                    if(checkSlugExistence($_slug)) {
                        $slug = $slug . '-' . ((int)Category::max('id') + 1);
                    } else {
                        $slug = $_slug;
                    }
                }

            } else {
                if ($checkSlugExistence->exists()) {
                    $last_slug_search_total = Category::where('slug', 'LIKE', '%' . $slug . '%')->count();
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
     * For Data Store in Database
     * @param Request $request
     * @return Category|string
     */
    public function save(Request $request)
    {
        try {
            DB::beginTransaction();

            $uuid = (string)$request->input('uuid');
            $slug = (string)$request->input('slug');
            $parent_cat_uuid = (string) $request->input('parent_cat_uuid');

            $checkExistence = Category::where('uuid', '=', $uuid);

            if ($uuid != null && $checkExistence->exists()) {
                $category = $checkExistence->first();

                if($uuid == $parent_cat_uuid) {
                    return Endpoint::endWith(false, "You can not select self category as a parent!");
                }

            } else {
                $category = new Category();
                $module_code = UAP::$MODULES['CATEGORY']['Code'];
                $prefix = UAP::$MODULES['CATEGORY']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $category->code = $generated_doc_code;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $category->parent_cat_uuid = $parent_cat_uuid;
            $category->name = (string) $request->input('name');
            $category->description = (string) $request->input('description');
            $category->slug = (string) $slug;
            $category->is_featured = (boolean) $request->input('is_featured');
            $category->image_uri = (string) $request->input('image_uri');
            $category->banner_image_uri = (string) $request->input('banner_image_uri');
            $category->banner_text = (string) $request->input('banner_text');
            $category->status = (string) $request->input('status');
            $category->save();

            DB::commit();
            return Endpoint::endWith(true, Endpoint::savedMessage("Category"));
        } catch (Exception $exception) {
            DB::rollback();
            return Endpoint::endWithException($exception);
        }


    }

    public function saveCategorySingleProperty(Request $request) {
        try {
            DB::beginTransaction();

            $uuid = (string) $request->input('uuid');
            $key = (string) $request->input('key');
            $value = $request->input('value');

            $category = Category::where('uuid', '=', $uuid);

            if($category->exists()) {
                $category = $category->first();

                if($key == 'name') {
                    $category->name = $value;
                }

                $category->save();

                DB::commit();
                return Endpoint::endWith(true, Endpoint::savedMessage("Category"));
            }

        } catch (Exception $exception) {
            DB::rollback();
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

            if (Helper::categoryDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }
            if ($force === 1) {
                Category::where('uuid', '=', $uuid)->delete();
            } else {
                $category = Category::where('uuid', '=', $uuid)->first();
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
