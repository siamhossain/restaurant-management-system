<?php

namespace App\Http\Controllers\Admin\Classes;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Models\AccountCategory;
use App\Models\AccountHead;
use App\Models\AccountingHistory;
use App\Models\AccountingSetting;
use Illuminate\Support\Facades\DB;

class AccountingHandler
{

    /**
     * Returns whether the auto accounting entry is enabled or not
     * @return bool
     */
    public static function autoEntryEnabled()
    {
        $auto_accounting_entry = false;
        $accounting_settings = AccountingSetting::skip(0)->take(1);

        if ($accounting_settings->exists()) {
            $accounting_settings = $accounting_settings->first();
            $auto_accounting_entry = (boolean)$accounting_settings->auto_accounting_entry;
        }

        return $auto_accounting_entry;
    }


    /**
     * @param $action_type "cash_sales | cash_purchase | supplier_payment | customer_payment"
     * @return mixed
     */
    public static function getSettings($action_type)
    {
        $category_column = "";
        $head_column = "";
        if ($action_type === "cash_sales") {
            $category_column = "cash_sales_category_uuid";
            $head_column = "cash_sales_head_uuid";
        } elseif ($action_type === "cash_purchase") {
            $category_column = "cash_purchase_category_uuid";
            $head_column = "cash_purchase_head_uuid";
        } elseif ($action_type === "customer_payment") {
            $category_column = "customer_payment_category_uuid";
            $head_column = "customer_payment_head_uuid";
        } elseif ($action_type === "supplier_payment") {
            $category_column = "supplier_payment_category_uuid";
            $head_column = "supplier_payment_head_uuid";
        }

        $accounting_settings = AccountingSetting::skip(0)->take(1);

        if ($accounting_settings->exists()) {
            $accounting_settings = $accounting_settings->first();

            $account_category_uuid = $accounting_settings->$category_column;
            $account_head_uuid = $accounting_settings->$head_column;

            $account_category_name = AccountCategory::where('uuid', '=', $account_category_uuid)->first()->name;
            $account_head_name = AccountHead::where('uuid', '=', $account_head_uuid)->first()->name;


            return (object)[
                'account_category_name' => $account_category_name,
                'account_category_uuid' => $account_category_uuid,
                'account_head_name' => $account_head_name,
                'account_head_uuid' => $account_head_uuid,
            ];
        }

        return false;
    }

    /**
     * Make accounting history entry
     * @param $accountingData {uuid: string, is_auto_entry: boolean, comment: string, account_category_uuid: string, account_category_name: string, account_head_uuid: string, account_head_name: string, type: 'Income' | 'Expense', total_amount: double, document_date: string}
     * @return bool|object
     */
    public static function makeEntry($accountingData)
    {
        DB::beginTransaction();
        $accountingData = (object)$accountingData;

        $accounting_history = null;

        if ((string)$accountingData->uuid != null) {
            $accounting_history = AccountingHistory::where('uuid', '=', $accountingData->uuid);
        } elseif ((boolean)$accountingData->is_auto_entry && (string)$accountingData->uuid == null && (string)$accountingData->comment != null) {
            $accounting_history = AccountingHistory::where('comment', '=', $accountingData->comment);
        }

        if ($accounting_history != null && $accounting_history->exists()) {
            $accounting_history = $accounting_history->first();
        } else {
            $accounting_history = new AccountingHistory();

            if ($accountingData->type === "Income") {
                $module_code = UAP::$MODULES['INCOME']['Code'];
                $prefix = UAP::$MODULES['INCOME']['DocCodePrefix'];
            } elseif ($accountingData->type === "Expense") {
                $module_code = UAP::$MODULES['EXPENSE']['Code'];
                $prefix = UAP::$MODULES['EXPENSE']['DocCodePrefix'];
            } else {
                $module_code = UAP::$MODULES['ACCOUNTING_HISTORY']['Code'];
                $prefix = UAP::$MODULES['ACCOUNTING_HISTORY']['DocCodePrefix'];
            }

            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $accounting_history->code = $generated_doc_code;
//            $accounting_history->created_by_uuid = auth()->user()->uuid;
            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        if ($accounting_history != null) {
            $accounting_history->is_auto_entry = (boolean)$accountingData->is_auto_entry;
            $accounting_history->is_deleted = 0;
            $accounting_history->account_category_uuid = (string)$accountingData->account_category_uuid;
            $accounting_history->account_category_name = (string)$accountingData->account_category_name;
            $accounting_history->account_head_uuid = (string)$accountingData->account_head_uuid;
            $accounting_history->account_head_name = (string)$accountingData->account_head_name;
            $accounting_history->type = (string)$accountingData->type;
            $accounting_history->comment = (string)$accountingData->comment;
            $accounting_history->total_amount = (double)$accountingData->total_amount;
            $accounting_history->date = (string)$accountingData->date;
            $accounting_history->save();

            DB::commit();
            return (object)[
                'uuid' => $accounting_history->refresh()->uuid,
                'code' => $accounting_history->code,
            ];
        }

        return false;
    }

    /**
     * Get the cash amount of a date
     * @param $date
     * @return float|int
     */
    public static function getCashAmount($date)
    {
        $balance = 0;

        $income = (double)AccountingHistory::where('type', '=', 'Income')->where('document_date', '=', $date)->sum('total_amount');
        $expense = (double)AccountingHistory::where('type', '=', 'Expense')->where('document_date', '=', $date)->sum('total_amount');

        if ($income >= $expense) {
            $balance = $income - $expense;
        }

        return $balance;
    }

    /**
     * Get the daily profit
     *
     */

    public static function getDailyProfit($date) {

        $total_profit = 0;

        $sql = "SELECT SUM(SOP.qty) as total_qty, SOP.unit_price as unit_price, SOP.title as title, SUM(SOP.total_amount) as total_amount , ((SOP.unit_price - PV.purchase_price) * SUM(SOP.qty)) as profit
FROM sales_order_particulars SOP
         INNER JOIN sales_orders SO ON SOP.sales_order_uuid = SO.uuid
INNER JOIN product_variants PV ON PV.uuid = SOP.product_variant_uuid
WHERE SO.document_date BETWEEN '{$date}' AND '{$date}'
GROUP BY SOP.product_variant_uuid";

        $summary = DB::select($sql);

        foreach ($summary as $sum) {
            $total_profit = $total_profit + $sum->profit;
        }

        return $total_profit;
    }
}
