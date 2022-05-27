<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Due;
use App\Models\StoreInformation;
use App\Models\Supplier;
use App\Models\SupplierPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SupplierController extends Controller
{
    public function index(Request $request) {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');

            $search_query = (string)$request->input('search_query');

            $suppliers = Supplier::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('full_name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('email', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('area_code', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('phone_number', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });


            $TotalRows = $suppliers->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $suppliers = $suppliers->skip($Offset)->take($RowsPerPage)->orderBy('created_at', 'desc')->get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Supplier"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $suppliers,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function suppliersForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $suppliers = Supplier::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('full_name', 'LIKE', '%' . $search_query . '%')
                        ->orWhere('phone_number', 'LIKE', '%' . $search_query . '%');
                })
                ->get();

            foreach($suppliers as $supplier) {
                $supplier->dropdown_label = $supplier->full_name . " | " . $supplier->phone_number;
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Suppliers"), $suppliers);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request) {
        try {
            $uuid = (string)$request->input('uuid');
            $email = (string)$request->input('email');
            $phone = (string)$request->input('phone_number');

            $checkEmailExistence = Supplier::where('email', '=', $email);
            $checkPhoneExistence = Supplier::where('phone_number', '=', $phone);
            $checkExistence = Supplier::where('uuid', '=', $uuid);
            if ($uuid != null && $checkExistence->exists()) {
                if ($email != null && $checkEmailExistence->where('uuid', '<>', $uuid)->exists()) {
                    return Endpoint::endWith(false, Endpoint::duplicateEntryMessage("Email Address"));
                }

                if ($checkPhoneExistence->where('uuid', '<>', $uuid)->exists()) {
                    return Endpoint::endWith(false, Endpoint::duplicateEntryMessage("Phone Number"));
                }

                $supplier = $checkExistence->first();
//                $supplier->updated_by_uuid = auth()->user()->uuid;
            } else {

                if ($email != null && $checkEmailExistence->exists()) {
                    return Endpoint::endWith(false, Endpoint::duplicateEntryMessage("Email Address"));
                }

                if ($checkPhoneExistence->exists()) {
                    return Endpoint::endWith(false, Endpoint::duplicateEntryMessage("Phone Number"));
                }

                $supplier = new Supplier();

                //generate the document code
                $module_code = UAP::$MODULES['SUPPLIER']['Code'];
                $prefix = UAP::$MODULES['SUPPLIER']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

                $supplier->code = $generated_doc_code;
//                $supplier->created_by_uuid = auth()->user()->uuid;
                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $supplier->full_name = $request->input('full_name');
            $supplier->area_code = $request->input('area_code');
            $supplier->address = $request->input('address');
            $supplier->profile_image_uri = $request->input('profile_image_uri');
            $supplier->phone_number = $phone;
            $supplier->email = $email;
            if ($request->input('password') != null) {
                $supplier->password = Hash::make($request->input('password'));
            }
            $supplier->status = $request->input('status');
            $supplier->save();

            if ($uuid) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Supplier"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Supplier"));
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
    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if (Helper::supplierDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }

            if ($force === 1) {
                Supplier::where('uuid', '=', $uuid)->delete();
            } else {
                $supplier = Supplier::where('uuid', '=', $uuid)->first();
                $supplier->is_deleted = 1;
//                $supplier->deleted_by_uuid = auth()->user()->uuid;
                $supplier->deleted_at = date('Y-m-d H:i:s', time());
                $supplier->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage("Supplier"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function supplierList()
    {
        try {
            $suppliers = Supplier::where('status', '=', 'Active')->where('is_deleted', '=', 0)->get();
            $total_dues = 0;
            $total_advanced = 0;
            $total_pay = 0;
            $total_due = 0;
            foreach ($suppliers as $supplier) {
                $total_pay = SupplierPayment::where('supplier_uuid', '=', $supplier->uuid)->sum('paid_amount');
                $total_due = Due::where('participant_uuid', '=', $supplier->uuid)->sum('amount');
                if ((double)$total_pay < (double)$total_due) {
                    $supplier->total_due = (double)$total_due - (double)$total_pay;
                    $supplier->advanced = 0;
                } else {
                    $supplier->total_due = 0;
                    $supplier->advanced = (double)$total_pay - (double)$total_due;
                }

                $total_dues = $total_dues + $supplier->total_due;
                $total_advanced = $total_advanced + $supplier->advanced;

            }
            $store_info = StoreInformation::first();

            return view('reports.supplier.supplier_list', compact('suppliers', 'total_advanced', 'total_dues', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
