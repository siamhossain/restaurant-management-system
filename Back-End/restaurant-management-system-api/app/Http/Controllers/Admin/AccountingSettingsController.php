<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\AccountingSetting;
use Exception;
use Illuminate\Http\Request;

class AccountingSettingsController extends Controller
{

    /**
     * For Dropdown Data
     * @param Request $request
     * @return AccountingSetting[]|\Illuminate\Database\Eloquent\Collection|string
     */

    public function getAccountingSettings(Request $request)
    {
        try {
            $accounting_histories = AccountingSetting::first();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Accounting Settings'), $accounting_histories);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return AccountingSetting|string
     */

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');

//           return $request->all();
            if ($uuid != null) {
                $accounting_history = AccountingSetting::where('uuid', '=', $uuid)->first();
//                $accounting_history->updated_by_uuid = auth()->user()->uuid;
            } else {
                $accounting_history = new AccountingSetting();
//                $module_code = UAP::$MODULES['ACCOUNTING_HISTORY']['Code'];
//                $prefix = UAP::$MODULES['ACCOUNTING_HISTORY']['DocCodePrefix'];
//                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
//                $accounting_history->code = $generated_doc_code;
//                $accounting_history->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
//                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $accounting_history->auto_accounting_entry = (boolean)$request->input('auto_accounting_entry');
            $accounting_history->cash_sales_category_uuid = (string)$request->input('cash_sales_category_uuid');
            $accounting_history->cash_sales_head_uuid = (string)$request->input('cash_sales_head_uuid');
            $accounting_history->cash_purchase_category_uuid = (string)$request->input('cash_purchase_category_uuid');
            $accounting_history->cash_purchase_head_uuid = (string)$request->input('cash_purchase_head_uuid');
            $accounting_history->customer_payment_category_uuid = (string)$request->input('customer_payment_category_uuid');
            $accounting_history->customer_payment_head_uuid = (string)$request->input('customer_payment_head_uuid');
            $accounting_history->supplier_payment_category_uuid = (string)$request->input('supplier_payment_category_uuid');
            $accounting_history->supplier_payment_head_uuid = (string)$request->input('supplier_payment_head_uuid');
            $accounting_history->save();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Accounting Setting"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Accounting Setting"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Data Delete
     * @param Request $request
     * @return string
     */
    public function delete(Request $request)
    {
        try {

            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                AccountingSetting::where('uuid', '=', $uuid)->delete();
            } else {
                $accounting_history = AccountingSetting::where('uuid', '=', $uuid)->first();
                $accounting_history->is_deleted = 1;
                $accounting_history->deleted_by_uuid = auth()->user()->uuid;
                $accounting_history->deleted_at = date('Y-m-d H:i:s', time());
                $accounting_history->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage('Accounting Setting'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
