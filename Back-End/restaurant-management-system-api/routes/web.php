<?php

use App\Http\Controllers\Admin\AccountingHistoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\CustomerPaymentController;
use App\Http\Controllers\Admin\DueInvoiceController;
use App\Http\Controllers\Admin\IngredientController;
use App\Http\Controllers\Admin\IngredientPurchaseController;
use App\Http\Controllers\Admin\IngredientUsesController;
use App\Http\Controllers\Admin\PurchaseOrderController;
use App\Http\Controllers\Admin\PurchaseOrderReturnController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SalesOrderController;
use App\Http\Controllers\Admin\SalesOrderReturnController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\SupplierPaymentController;
use App\Http\Controllers\Admin\WastageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => '/v1/admin'], static function () {

    //purchase Reports
    Route::group(['prefix' => '/reports'], static function() {
        Route::get('/purchase-summary', [PurchaseOrderController::class, 'purchaseSummary']);
        Route::get('/purchase-details', [PurchaseOrderController::class, 'purchaseDetails']);
        Route::get('/purchase-return-summary', [PurchaseOrderReturnController::class, 'purchaseReturnSummary']);
        Route::get('/purchase-return-details', [PurchaseOrderReturnController::class, 'purchaseReturnDetails']);

        Route::get('/sales-summary', [SalesOrderController::class, 'salesSummary']);
        Route::get('/sales-details', [SalesOrderController::class, 'salesDetails']);
        Route::get('/sales-return-summary', [SalesOrderReturnController::class, 'salesReturnSummary']);
        Route::get('/sales-return-details', [SalesOrderReturnController::class, 'salesReturnDetails']);

        Route::get('/wastage-summary', [WastageController::class, 'wastageSummary']);
        Route::get('/wastage-report', [WastageController::class, 'wastageReport']);

        Route::get('/customer-payment-summary', [CustomerPaymentController::class, 'customerPaymentSummary']);
        Route::get('/supplier-payment-summary', [SupplierPaymentController::class, 'supplierPaymentSummary']);

        Route::get('/invoice-summary', [DueInvoiceController::class, 'invoiceSummary']);

        Route::get('/general-ledger', [AccountingHistoryController::class, 'generalLedger']);
        Route::get('/accounting-histories', [AccountingHistoryController::class, 'accountingHistory']);
        Route::get('/profit-loss', [AccountingHistoryController::class, 'profitLoss']);
        Route::get('/income-balance-sheet', [ReportController::class, 'incomeBalanceSheet']);
        Route::get('/stock-report', [StockController::class, 'stockReport']);
        Route::get('/customer-list', [CustomerController::class, 'customerList']);
        Route::get('/supplier-list', [SupplierController::class, 'supplierList']);

        Route::get('/ingredient-purchase-summary', [IngredientPurchaseController::class, 'ingredientPurchaseSummary']);
        Route::get('/ingredient-purchase-details', [IngredientPurchaseController::class, 'ingredientPurchaseDetails']);

        Route::get('/ingredient-uses-summary', [IngredientUsesController::class, 'ingredientUsesSummary']);
        Route::get('/ingredient-uses-details', [IngredientUsesController::class, 'ingredientUsesDetails']);

    });

});
