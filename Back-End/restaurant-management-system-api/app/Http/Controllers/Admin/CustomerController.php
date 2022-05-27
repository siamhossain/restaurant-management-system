<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerPayment;
use App\Models\Due;
use App\Models\StoreInformation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        try {

            //return $request->all();

            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');


            $customers = Customer::when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%');
            })->where('is_deleted', '=', 0);

            $TotalRows = $customers->count();

            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $customers = $customers->skip($Offset)->take($RowsPerPage)->where('is_deleted', '=', 0)->get();

            foreach ($customers as $customer) {
                $customer->paid = CustomerPayment::where('customer_uuid', '=', $customer->uuid)->sum('paid_amount');
                $customer->due = Due::where('participant_uuid', '=', $customer->uuid)->sum('amount');
            }
            return Endpoint::endWith(true, Endpoint::fetchedMessage("Customer"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $customers,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }

    }


    public function customersForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $customers = Customer::where('status', '=', 'Active')->where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('name', 'LIKE', '%' . $search_query . '%');
                })->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Brands'), $customers);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {

        $uuid = (string)$request->input('uuid');

        if ($uuid !== "") {
            $customer = Customer::where('uuid', '=', $uuid)->first();
            $customer->updated_by_uuid = auth()->user()->uuid;

        } else {
            $customer = new Customer();
            $module_code = UAP::$MODULES['CUSTOMER']['Code'];
            $prefix = UAP::$MODULES['CUSTOMER']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $customer->code = $generated_doc_code;
            $customer->created_by_uuid = auth()->user()->uuid;

            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        $customer->name = $request->input('name');
        $customer->email = $request->input('email');
        $customer->phone_number = $request->input('phone_number');
        $customer->address = $request->input('address');
        $customer->area_code = $request->input('area_code');
        $customer->profile_image_uri = $request->input('profile_image_uri');
        $customer->status = $request->input('status');

        if ($request->input('password') != null) {
            $customer->password = Hash::make($request->input('password'));
        }

        $customer->save();

        if ($uuid !== "") {
            return Endpoint::endWith(true, Endpoint::updatedMessage("Customer"));
        } else {
            return Endpoint::endWith(true, Endpoint::createdMessage("Customer"));
        }

    }


    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');
            if (Helper::customerDeleteRestriction($uuid)) {
                return [
                    'success' => false,
                    'error_code' => 'RELATIONAL_ENTRY_DETECTED',
                    'message' => 'Delete restricted for relational entries!',
                ];
            }

            if ($uuid !== null) {
                $customer = Customer::where('uuid', '=', $uuid);

                if ($force === 1) {
                    $customer->delete();
                } elseif ($customer->exists()) {
                    $customer = $customer->first();
                    $customer->is_deleted = 1;
                    $customer->deleted_at = date('Y-m-d H:i:s', time());
                    $customer->save();
                } else {
                    return Endpoint::endWith(false, "Customer not found!");
                }

                return Endpoint::endWith(true, Endpoint::deletedMessage("Customer"));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function customerInfoByUUID(Request $request) {
        try {
            $uuid = $request->input('uuid');

            $customer = Customer::where('uuid', '=', $uuid)->first();

            return Endpoint::endWith(true, Endpoint::fetchedMessage('Customer'), $customer);
        } catch (Exception $exception) {
            Endpoint::endWithException($exception);
        }
    }

    public function customerList() {
        try {
            $customers = Customer::where('status', '=', 'Active')->where('is_deleted', '=', 0)->get();
            $total_dues = 0;
            $total_advanced = 0;
            $total_pay = 0;
            $total_due = 0;
            foreach ($customers as $customer) {
                $total_pay = CustomerPayment::where('customer_uuid', '=', $customer->uuid)->sum('paid_amount');
                $total_due = Due::where('participant_uuid', '=', $customer->uuid)->sum('amount');
                if ((double)$total_pay < (double)$total_due) {
                    $customer->total_due = (double)$total_due - (double)$total_pay;
                    $customer->advanced = 0;
                } else {
                    $customer->total_due = 0;
                    $customer->advanced = (double)$total_pay - (double)$total_due;
                }

                $total_dues = $total_dues + $customer->total_due;
                $total_advanced = $total_advanced + $customer->advanced;

            }
            $store_info = StoreInformation::first();

            return view('reports.customer.customer_list', compact('customers', 'total_advanced', 'total_dues', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
