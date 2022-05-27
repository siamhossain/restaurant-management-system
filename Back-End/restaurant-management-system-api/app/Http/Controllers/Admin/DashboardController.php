<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\AccountingHistory;
use App\Models\Customer;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesOrderReturnParticular;
use App\Models\Supplier;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getData()
    {
        try {
            $total_customer = Customer::where('is_deleted', '=', 0)->count();
            $total_supplier = Supplier::where('is_deleted', '=', 0)->count();
            $total_product = Product::where('is_deleted', '=', 0)->count();
            $total_saleItem = SalesOrder::where('is_deleted', '=', 0)->count();
            $total_income = AccountingHistory::where('is_deleted', '=', 0)->where('type', '=', 'Income')->sum('total_amount');
            $total_expense = AccountingHistory::where('is_deleted', '=', 0)->where('type', '=', 'Expense')->sum('total_amount');

            $data = [
                'total_customer' => $total_customer,
                'total_supplier' => $total_supplier,
                'total_product' => $total_product,
                'total_salesItem' => $total_saleItem,
                'total_income' => $total_income,
                'total_expense' => $total_expense,
            ];
            return Endpoint::endWith(true, 'Success', $data);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function topProduct()
    {
        try {
            $sql = "SELECT * FROM (SELECT *, getProductTotalSales(P.uuid) AS total_sales FROM products P) P WHERE P.total_sales > 0 ORDER BY P.total_sales DESC LIMIT 4";
            $products = DB::select($sql);

            return Endpoint::endWith(true, Endpoint::fetchedMessage('Top Product'), $products);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
