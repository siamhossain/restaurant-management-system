<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\PurchaseOrderParticular;
use App\Models\PurchaseOrderReturnParticular;
use App\Models\SalesOrderParticular;
use App\Models\SalesOrderReturnParticular;
use App\Models\StoreInformation;
use App\Models\WastageParticular;
use Exception;
use Illuminate\Http\Request;

class StockController extends Controller
{


    public function stockReport(Request $request)
    {
        try {
            $category_uuid = (string)$request->input('category_uuid');
            $brand_uuid = (string)$request->input('brand_uuid');

            $products = Product::where('is_deleted', '=', 0);

            if ($category_uuid != "") {
                $products = $products->where('category_uuid', '=', $category_uuid);
            }

            if ($brand_uuid != "") {
                $products = $products->where('brand_uuid', '=', $brand_uuid);
            }

            $total_stock = 0;

            $products = $products->with('category')->with('brand')->with('unit')->get();

            foreach ($products as $product) {
                $wastage = WastageParticular::where('product_uuid', '=', $product->uuid)->sum('qty');
                $purchase = PurchaseOrderParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $purchase_return = PurchaseOrderReturnParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $salse = SalesOrderParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $salse_return = SalesOrderReturnParticular::where('product_uuid', '=', $product->uuid)->sum('quantity');
                $product->stock = ((double)$purchase + (double)$salse_return) - ((double)$salse + (double)$purchase_return + (double)$wastage);
                $total_stock = $total_stock + $product->stock;
            }

            $store_info = StoreInformation::first();
            return view('reports.stock.stock_report', compact('products', 'store_info', 'total_stock'));

        } catch (Exception $exception) {
            return $exception;
        }
    }
}
