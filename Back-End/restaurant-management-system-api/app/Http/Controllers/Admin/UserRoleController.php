<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\UserRole;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRoleController extends Controller
{
    public function index(Request $request) {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $user_roles = UserRole::when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query. '%');
            });

            $TotalRows = $user_roles->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $user_roles = $user_roles->skip($Offset)->take($RowsPerPage)->get();

            foreach ($user_roles as $user_role) {
                $user_role->modules = UAP::getRolePermissions($user_role->id);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("User Role"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $user_roles,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Dropdown Data
     * @return UserRole[]|\Illuminate\Database\Eloquent\Collection|string
     */

    public function userRolesForDropdown()
    {
        try {
            $user_roles = UserRole::get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage('User Role'), $user_roles);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request) {
        try {
            DB::beginTransaction();

            $id = (string)$request->input('id');
            $checkExistence = UserRole::where('id', '=', $id);
            if ($id != null && $checkExistence->exists()) {
                $user_role = $checkExistence->first();
            } else {
                $user_role = new UserRole();
            }

            $user_role->title = (string)$request->input('title');
            $user_role->key = (string)strtolower($request->input('title'));
            $user_role->save();

            DB::commit();

            if ($id != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage('User Role'));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage('User Role'));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function delete(Request $request)
    {
        try {
            $id = (string)$request->input('id');
            $force = (int)$request->input('force');
            if ($force === 1) {
                UserRole::where('id', '=', $id)->delete();
            } else {
                $user_role = UserRole::where('id', '=', $id)->first();
                $user_role->is_deleted = 1;
                $user_role->deleted_by_uuid = auth()->user()->uuid;
                $user_role->deleted_at = date('Y-m-d H:i:s', time());
                $user_role->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage('User Role'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
