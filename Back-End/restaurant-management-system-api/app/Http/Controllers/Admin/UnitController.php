<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Unit;
use Exception;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request) {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $units = Unit::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $units->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $units = $units->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Units"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $units,
            ]);
        }catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function unitsFormDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $units = Unit::where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Brands'), $units);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');

            if ($uuid != null) {
                $unit = Unit::where('uuid', '=', $uuid)->first();
//                $unit->updated_by_uuid = auth()->user()->uuid;
            } else {
                $unit = new Unit();
                $module_code = UAP::$MODULES['UNIT']['Code'];
                $prefix = UAP::$MODULES['UNIT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $unit->code = $generated_doc_code;
//                $unit->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $unit->name = (string)$request->input('name');
            $unit->save();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Unit"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Unit"));
            }

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

            if (Helper::unitDeleteRestriction($uuid)) {
                return Endpoint::endWith(false, 'Delete restricted for relational entries!', null, 'RELATIONAL_ENTRY_DETECTED');
            }

            if ($force === 1) {
                Unit::where('uuid', '=', $uuid)->delete();
            } else {
                $category = Unit::where('uuid', '=', $uuid)->first();
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
