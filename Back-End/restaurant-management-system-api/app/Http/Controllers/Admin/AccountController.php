<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\AccountCategory;
use App\Models\AccountHead;
use Exception;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * For Data Table Grid
     * @param Request $request
     * @return string
     */
    public function categoriesIndex(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $account_categories = AccountCategory::when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('type', 'LIKE', '%' . $search_query . '%');
            })->where('is_deleted', '=', 0);

            $TotalRows = $account_categories->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $account_categories = $account_categories->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Account category"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $account_categories,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Dropdown Data
     * @param Request $request
     * @return AccountCategory[]|\Illuminate\Database\Eloquent\Collection|string
     */
    public function accountCategoriesForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $type = (string)$request->input('type');

            $account_categories = AccountCategory::where('is_deleted', '=', 0)
                ->when($type != null, function ($q) use ($type) {
                    return $q->where('type', '=', $type);
                })
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })
                ->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Account Categories"), $account_categories);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return AccountCategory|string
     */

    public function saveCategory(Request $request)
    {

        try {
            $uuid = (string)$request->input('uuid');
            if ($uuid != null) {
                $account_category = AccountCategory::where('uuid', '=', $uuid)->first();
//                $account_category->updated_by_uuid = auth()->user()->uuid;
            } else {
                $account_category = new AccountCategory();

//                $account_category->created_by_uuid = "305913c5-3c62-11ec-921d-00d86171adfe"; //auth()->user()->uuid
            }
            $account_category->name = (string)$request->input('name');
            $account_category->type = (string)$request->input('type');
            $account_category->save();


            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Account Category"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Account Category"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Delete
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function deleteCategory(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if (Helper::accountCategoryDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }

            if ($force === 1) {
                AccountCategory::where('uuid', '=', $uuid)->delete();
            } else {
                $account_category = AccountCategory::where('uuid', '=', $uuid)->first();
                $account_category->is_deleted = 1;
//                $account_category->deleted_by_uuid = auth()->user()->uuid;
                $account_category->deleted_at = date('Y-m-d H:i:s', time());
                $account_category->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage("Account Category"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Table Gruuid
     * @param Request $request
     * @return string
     */
    public function headIndex(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $account_heads = AccountHead::when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('type', 'LIKE', '%' . $search_query . '%');
            })->with('accountCategory')->where('is_deleted', '=', 0);

            $TotalRows = $account_heads->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $account_heads = $account_heads->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Account category"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $account_heads,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Dropdown Data
     * @return AccountCategory[]|\Illuminate\Database\Eloquent\Collection|string
     */
    public function accountHeadsForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $type = (string)$request->input('type');

            $account_heads = AccountHead::where('is_deleted', '=', 0)
                ->when($type != null, function ($q) use ($type) {
                    return $q->where('type', '=', $type);
                })
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })
                ->get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Account Heads"), $account_heads);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return AccountCategory|string
     */

    public function saveHead(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $checkExistence = AccountHead::where('uuid', '=', $uuid);
            if ($uuid != null && $checkExistence->exists()) {
                $account_head = $checkExistence->first();
//                $account_head->updated_by_uuid = auth()->user()->uuid;
            } else {
                $account_head = new AccountHead();

            }

            $account_head->name = (string)$request->input('name');
            $account_head->type = (string)$request->input('type');
            $account_head->account_category_uuid = (string)$request->input('account_category_uuid');
            $account_head->save();


            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Account Head"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Account Head"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Delete
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function deleteHead(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if (Helper::accountHeadDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }
            if ($force === 1) {
                AccountHead::where('uuid', '=', $uuid)->delete();
            } else {
                $account_head = AccountHead::where('uuid', '=', $uuid)->first();
                $account_head->is_deleted = 1;
//                $account_head->deleted_by_uuid = auth()->user()->uuid;
                $account_head->deleted_at = date('Y-m-d H:i:s', time());
                $account_head->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage("Account Head"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


}
