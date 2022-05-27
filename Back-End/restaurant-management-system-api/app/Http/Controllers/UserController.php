<?php

namespace App\Http\Controllers;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Models\User;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index(Request $request)
    {
        try {
            /*$users = User::where('is_deleted', '=', 0)->with('user')->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage("Supplier List"), [
                'users' => $users,
            ]);*/

            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $users = User::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('title', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $users->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $users = $users->skip($Offset)->take($RowsPerPage)->with('role')->get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Users"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $users,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function userForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $brands = User::where('status', '=', 'Active')->where('is_deleted', '=', 0)
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
            DB::beginTransaction();
            $uuid = (string)$request->input('uuid');

//           return $request->all();
            if ($uuid != null) {
                $user = User::where('uuid', '=', $uuid)->first();
//                $user->updated_by_uuid =auth()->user()->uuid;
            } else {
                $user = new User();
                $module_code = UAP::$MODULES['USER']['Code'];
                $prefix = UAP::$MODULES['USER']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $user->code = (string)$generated_doc_code;
//                $user->created_by_uuid = auth()->user()->uuid;

//                update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $user->role_id = (string)$request->input('role_id');
            $user->name = (string)$request->input('name');
            $user->username = (string)$request->input('username');
            $user->phone = (string)$request->input('phone');
            $user->address = (string)$request->input('address');
            $user->email = (string)$request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->status = (string)$request->input('status');
            $user->save();


            DB::commit();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("User"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("User"));
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
            if ($force === 1) {
                User::where('id', '=', $uuid)->delete();
            } else {
                $booking = User::where('uuid', '=', $uuid)->first();
                $booking->is_deleted = 1;
                $booking->deleted_by_uuid = auth()->user()->uuid;
                $booking->deleted_at = date('Y-m-d H:i:s', time());
                $booking->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage('User'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

}
