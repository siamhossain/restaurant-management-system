<?php

namespace App\Helpers;

use App\Models\AccountHead;
use App\Models\AccountingHistory;
use App\Models\Category;
use App\Models\CustomerPayment;
use App\Models\IngredientCategory;
use App\Models\IngredientPurchaseParticular;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderParticular;
use App\Models\PurchaseOrderReturn;
use App\Models\PurchaseOrderReturnParticular;
use App\Models\SalesOrder;
use App\Models\SalesOrderParticular;
use App\Models\SalesOrderReturn;
use App\Models\SalesOrderReturnParticular;
use App\Models\StoreInformation;
use App\Models\SupplierPayment;
use Exception;
use Illuminate\Support\Facades\DB;

class Helper
{

    public static function storeInformation()
    {
        try {
            $store_information = StoreInformation::all();
            return $store_information;
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Get the previous 1 or custom day date
     * @param $date
     * @param int $daysBefore
     * @return false|string
     */
    public static function getPreviousDate($date, $daysBefore = 1)
    {
        return date('Y-m-d', strtotime('-' . $daysBefore . ' day', strtotime($date)));
    }

    /**
     * Crate a date range array
     * @param $fromDate
     * @param $toDate
     * @return array
     */
    public static function createDateRangeArray($fromDate, $toDate)
    {
        // takes two dates formatted as YYYY-MM-DD and creates an
        // inclusive array of the dates between the from and to dates.

        // could test validity of dates here but I'm already doing
        // that in the main script

        $aryRange = [];

        $iDateFrom = mktime(1, 0, 0, substr($fromDate, 5, 2), substr($fromDate, 8, 2), substr($fromDate, 0, 4));
        $iDateTo = mktime(1, 0, 0, substr($toDate, 5, 2), substr($toDate, 8, 2), substr($toDate, 0, 4));

        if ($iDateTo >= $iDateFrom) {
            array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
            while ($iDateFrom < $iDateTo) {
                $iDateFrom += 86400; // add 24 hours
                array_push($aryRange, date('Y-m-d', $iDateFrom));
            }
        }
        return $aryRange;
    }


    public static function getTotalExpense($date)
    {
        $data = AccountingHistory::where('type', 'Expense')->whereBetween('date', [$date . ' 00:00:00', $date . ' 23:59:59'])->sum('total_amount');
        return $data;
    }

    public static function getTotalSalesProfit($date)
    {
        $sql = "SELECT SOP.unit_price as unit_price, P.purchase_price as purchase_price, SOP.quantity as quantity
FROM sales_order_particulars SOP
         INNER JOIN products P ON P.uuid = SOP.product_uuid
         INNER JOIN sales_orders SO ON SO.uuid = SOP.sales_order_uuid WHERE SO.date BETWEEN '{$date}' AND '{$date}'";
        $data = DB::select($sql);
        $total = 0;
        $total_profit = 0;

        foreach ($data as $item) {
            $total = ($item->unit_price - $item->purchase_price) * $item->quantity;
            $item->profit = $total;

        }

        foreach ($data as $item) {
            $total_profit = $item->profit + $total_profit;
        }

        return $total_profit;

    }

    public static function categoryDeleteRestriction($uuid)
    {
        $restricted = false;

        if (Product::where('category_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }
        if (Category::where('parent_cat_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }


        return $restricted;
    }

    public static function brandDeleteRestriction($uuid)
    {
        $restricted = false;

        if (Product::where('brand_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }

        return $restricted;
    }

    public static function unitDeleteRestriction($uuid)
    {
        $restricted = false;

        if (Product::where('unit_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }

        return $restricted;
    }

    public static function customerDeleteRestriction($uuid)
    {
        $restricted = false;

        if (SalesOrder::where('customer_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }

        if (SalesOrderReturn::where('customer_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }

        if (CustomerPayment::where('customer_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restricted = true;
        }

        return $restricted;
    }

    public static function supplierDeleteRestriction($uuid)
    {
        $restriction = false;
        if (PurchaseOrder::where('supplier_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (PurchaseOrderReturn::where('supplier_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (SupplierPayment::where('supplier_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        return $restriction;
    }

    public static function accountCategoryDeleteRestriction($uuid)
    {
        $restriction = false;

        if (AccountHead::where('account_category_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (AccountingHistory::where('account_category_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        return $restriction;
    }

    public static function accountHeadDeleteRestriction($uuid)
    {
        $restriction = false;

        if (AccountingHistory::where('account_head_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        return $restriction;
    }

    public static function ingredientCategoryDeleteRestriction($uuid)
    {
        $restriction = false;

        if (IngredientCategory::where('parent_cat_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        return $restriction;
    }


    public static function productDeleteRestriction($uuid) {
        $restriction = false;

        if (SalesOrderParticular::where('product_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (SalesOrderReturnParticular::where('product_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (PurchaseOrderParticular::where('product_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        if (PurchaseOrderReturnParticular::where('product_uuid', '=', $uuid)->where('is_deleted', '=', 0)->exists()) {
            $restriction = true;
        }

        return $restriction;
    }

    public static function ingredientDeleteRestriction($uuid) {
        $restriction = false;

        if (IngredientPurchaseParticular::where('ingredient_uuid', '=', $uuid)) {
            $restriction = true;
        }

        return $restriction;
    }



}


