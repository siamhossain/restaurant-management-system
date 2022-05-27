<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AccountingHistoryController;
use App\Http\Controllers\Admin\AccountingSettingsController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\CustomerPaymentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DueInvoiceController;
use App\Http\Controllers\Admin\IngredientCategoryController;
use App\Http\Controllers\Admin\IngredientController;
use App\Http\Controllers\Admin\IngredientPurchaseController;
use App\Http\Controllers\Admin\IngredientUsesController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\PurchaseOrderController;
use App\Http\Controllers\Admin\PurchaseOrderReturnController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SalesOrderController;
use App\Http\Controllers\Admin\SalesOrderReturnController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\Admin\StoreFrontSliderController;
use App\Http\Controllers\Admin\StoreInformationController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\SupplierPaymentController;
use App\Http\Controllers\Admin\TableBookingController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Admin\WastageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => '/v1/admin'], static function () {

    //public routes
    Route::post('/auth/login', [AuthController::class, 'attempt']);
    Route::post('/store-information', [StoreInformationController::class, 'save']);
    Route::group(['middleware' => 'admin-auth'], static function () {
        Route::group(['middleware' => 'admin-user-checkpoint'], static function () {
            // Dropdown routes
            Route::group(['prefix' => 'dropdown'], static function () {
                Route::get('/categories', [CategoryController::class, 'categoriesForDropdown']);
                Route::get('/brands', [BrandController::class, 'brandsForDropdown']);
                Route::get('/users', [UserController::class, 'userForDropdown']);
                Route::get('/units', [UnitController::class, 'unitsFormDropdown']);
                Route::get('/ingredient-categories', [IngredientCategoryController::class, 'categoriesForDropdown']);
                Route::get('/ingredients', [IngredientController::class, 'ingredientForDropdown']);
                Route::get('/user-roles', [UserRoleController::class, 'userRolesForDropdown']);
                Route::get('/social-links', [SocialLinkController::class, 'socialLinkForDropdown']);
                Route::get('/customers', [CustomerController::class, 'customersForDropdown']);
                Route::get('/suppliers', [SupplierController::class, 'suppliersForDropdown']);
                Route::get('/account-categories', [AccountController::class, 'accountCategoriesForDropdown']);
                Route::get('/account-heads', [AccountController::class, 'accountHeadsForDropdown']);
                Route::get('/account-histories', [AccountingHistoryController::class, 'accountingHistoryForDropdown']);
                Route::get('/products', [ProductController::class, 'productForDropdown']);
                Route::get('/product-purchases', [PurchaseOrderController::class, 'purchaseOrderForDropdown']);
                Route::get('/product-purchase-returns', [PurchaseOrderReturnController::class, 'purchaseOrderReturnForDropdown']);
                Route::get('/sales-orders', [SalesOrderController::class, 'salesOrderForDropdown']);
                Route::get('/sales-return-orders', [SalesOrderReturnController::class, 'salesReturnForDropdown']);
                Route::get('/purchase-orders', [PurchaseOrderController::class, 'purchaseOrderForDropdown']);
                Route::get('/purchase-return-orders', [PurchaseOrderReturnController::class, 'purchaseOrderReturnForDropdown']);
                Route::get('/wastages', [WastageController::class, 'wastageForDropdown']);
                Route::get('/ingredient-purchases', [IngredientPurchaseController::class, 'ingredientPurchaseDropdown']);
                Route::get('/ingredient-uses', [IngredientUsesController::class, 'ingredientUsesDropdown']);
            });

            //Slug Checker and Get
            Route::group(['prefix' => 'slug-checkpoint'], static function () {
                Route::get('/category', [CategoryController::class, 'checkSlug']);
                Route::get('/brand', [BrandController::class, 'checkSlug']);
                Route::get('/product', [ProductController::class, 'checkSlug']);
                Route::get('/ingredient', [IngredientController::class, 'checkSlug']);
            });

            // Duplicate entry Checkpoint
            Route::group(['prefix' => 'duplicate-checkpoint'], static function () {
                Route::get("/sku", [ProductController::class, 'checkSkuExistence']);
                Route::get("/sku", [IngredientController::class, 'checkSkuExistence']);
            });

            // Data Grid routes
            Route::group(['prefix' => 'grid'], static function () {
                Route::get('/users', [UserController::class, 'index']);
                Route::get('/customers', [CustomerController::class, 'index']);
                Route::get('/user-roles', [UserRoleController::class, 'index']);
                Route::get('/suppliers', [SupplierController::class, 'index']);
                Route::get('/brands', [BrandController::class, 'index']);
                Route::get('/categories', [CategoryController::class, 'index']);
                Route::get('/units', [UnitController::class, 'index']);
                Route::get('/products', [ProductController::class, 'index']);
                Route::get('/ingredient-categories', [IngredientCategoryController::class, 'index']);
                Route::get('/ingredients', [IngredientController::class, 'index']);
                Route::get('/ingredient-stock', [IngredientController::class, 'ingredientStock']);
                Route::get('/store-front-sliders', [StoreFrontSliderController::class, 'index']);
                Route::get('/social-links', [SocialLinkController::class, 'index']);
                Route::get('/table-bookings', [TableBookingController::class, 'index']);
                Route::get('/ingredient-purchases', [IngredientPurchaseController::class, 'index']);
                Route::get('/ingredient-uses', [IngredientUsesController::class, 'index']);
                Route::get('/account-categories', [AccountController::class, 'categoriesIndex']);
                Route::get('/account-heads', [AccountController::class, 'headIndex']);
                Route::get('/accounting-histories', [AccountingHistoryController::class, 'index']);
                Route::get('/product-purchases', [PurchaseOrderController::class, 'index']);
                Route::get('/product-purchase-returns', [PurchaseOrderReturnController::class, 'index']);
                Route::get('/sales-orders', [SalesOrderController::class, 'index']);
                Route::get('/sales-order-returns', [SalesOrderReturnController::class, 'index']);
                Route::get('/customer-payments', [CustomerPaymentController::class, 'index']);
                Route::get('/supplier-payments', [SupplierPaymentController::class, 'index']);
                Route::get('/wastages', [WastageController::class, 'index']);
                Route::get('/due-invoices', [DueInvoiceController::class, 'index']);
                Route::get('/table-booking-for-kitchen', [TableBookingController::class, 'tableBookingForKitchen']);
                Route::get('/sales-order-for-kitchen', [SalesOrderController::class, 'salesFoodForKitchen']);

            });


            // For Saving/Updating Data
            Route::group(['prefix' => 'save'], static function () {
                Route::post('/user', [UserController::class, 'save']);
                Route::post('/customer', [CustomerController::class, 'save']);
                Route::post('/user-role', [UserRoleController::class, 'save']);
                Route::post('/supplier', [SupplierController::class, 'save']);
                Route::post('/brand', [BrandController::class, 'save']);
                Route::post('/category', [CategoryController::class, 'save']);
                Route::post('/category/single-property', [CategoryController::class, 'saveCategorySingleProperty']);
                Route::post('/unit', [UnitController::class, 'save']);
                Route::post('/product', [ProductController::class, 'save']);
                Route::post('/ingredient-category', [IngredientCategoryController::class, 'save']);
                Route::post('/category-single-property', [IngredientCategoryController::class, 'saveCategorySingleProperty']);
                Route::post('/ingredient', [IngredientController::class, 'save']);
                Route::post('/store-front-slider', [StoreFrontSliderController::class, 'save']);
                Route::post('/social-link', [SocialLinkController::class, 'save']);
                Route::post('/table-booking', [TableBookingController::class, 'save']);
                Route::post('/ingredient-purchase', [IngredientPurchaseController::class, 'save']);
                Route::post('/ingredient-uses', [IngredientUsesController::class, 'saveUses']);
                Route::post('/account-head', [AccountController::class, 'saveHead']);
                Route::post('/account-category', [AccountController::class, 'saveCategory']);
                Route::post('/account-history', [AccountController::class, 'saveCategory']);
                Route::post('/accounting-history', [AccountingHistoryController::class, 'save']);
                Route::post('/accounting-settings', [AccountingSettingsController::class, 'save']);
                Route::post('/product-purchase', [PurchaseOrderController::class, 'save']);
                Route::post('/product-purchase-return', [PurchaseOrderReturnController::class, 'save']);
                Route::post('/sales-order', [SalesOrderController::class, 'save']);
                Route::post('/sales-order-return', [SalesOrderReturnController::class, 'save']);
                Route::post('/customer-payment', [CustomerPaymentController::class, 'save']);
                Route::post('/supplier-payment', [SupplierPaymentController::class, 'save']);
                Route::post('/wastage', [WastageController::class, 'save']);
                Route::post('/due-invoice', [DueInvoiceController::class, 'save']);
                Route::post('/food-status-update', [TableBookingController::class, 'foodStatusUpdateByKitchen']);
                Route::post('/sales-food-status-update', [SalesOrderController::class, 'salesFoodStatusUpdateByKitchen']);
            });

            // For deleting data
            Route::group(['prefix' => 'delete'], static function () {
                Route::delete('/user', [UserController::class, 'delete']);
                Route::delete('/customer', [CustomerController::class, 'delete']);
                Route::delete('/user-role', [UserRoleController::class, 'delete']);
                Route::delete('/supplier', [SupplierController::class, 'delete']);
                Route::delete('/brand', [BrandController::class, 'delete']);
                Route::delete('/category', [CategoryController::class, 'delete']);
                Route::delete('/unit', [UnitController::class, 'delete']);
                Route::delete('/product', [ProductController::class, 'delete']);
                Route::delete('/store-front-slider', [StoreFrontSliderController::class, 'delete']);
                Route::delete('/social-link', [SocialLinkController::class, 'delete']);
                Route::delete('/table-booking', [TableBookingController::class, 'delete']);
                Route::delete('/ingredient-uses', [IngredientUsesController::class, 'delete']);
                Route::delete('/account-category', [AccountController::class, 'deleteCategory']);
                Route::delete('/account-head', [AccountController::class, 'deleteHead']);
                Route::delete('/accounting-history', [AccountingHistoryController::class, 'delete']);
                Route::delete('/purchase-order', [PurchaseOrderController::class, 'delete']);
                Route::delete('/purchase-order-return', [PurchaseOrderReturnController::class, 'delete']);
                Route::delete('/sales-order', [SalesOrderController::class, 'delete']);
                Route::delete('/sales-order-return', [SalesOrderReturnController::class, 'delete']);
                Route::delete('/customer-payment', [CustomerPaymentController::class, 'delete']);
                Route::delete('/supplier-payment', [SupplierPaymentController::class, 'delete']);
                Route::delete('/wastage', [WastageController::class, 'delete']);
                Route::delete('/wastage', [WastageController::class, 'delete']);
                Route::delete('/ingredient-category', [IngredientCategoryController::class, 'delete']);
                Route::delete('/due-invoice', [DueInvoiceController::class, 'delete']);
                Route::delete('/ingredient-purchase', [IngredientPurchaseController::class, 'delete']);
                Route::delete('/ingredient', [IngredientController::class, 'delete']);
            });

    // Store Information Data
    Route::get('/store-information', [StoreInformationController::class, 'index']);

    // private routes
    Route::group(['middleware' => 'admin-auth'], static function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Dropdown routes
        Route::group(['prefix' => 'dropdown'], static function () {
            Route::get('/categories', [CategoryController::class, 'categoriesForDropdown']);
            Route::get('/brands', [BrandController::class, 'brandsForDropdown']);
            Route::get('/units', [UnitController::class, 'unitsFormDropdown']);
            Route::get('/ingredient-categories', [IngredientCategoryController::class, 'categoriesForDropdown']);
            Route::get('/ingredients', [IngredientController::class, 'ingredientForDropdown']);
            Route::get('/user-roles', [UserRoleController::class, 'userRolesForDropdown']);
            Route::get('/social-links', [SocialLinkController::class, 'socialLinkForDropdown']);
            Route::get('/customers', [CustomerController::class, 'customersForDropdown']);
            Route::get('/suppliers', [SupplierController::class, 'suppliersForDropdown']);
            Route::get('/account-categories', [AccountController::class, 'accountCategoriesForDropdown']);
            Route::get('/account-heads', [AccountController::class, 'accountHeadsForDropdown']);
            Route::get('/account-histories', [AccountingHistoryController::class, 'accountingHistoryForDropdown']);
            Route::get('/products', [ProductController::class, 'productForDropdown']);
            Route::get('/product-purchases', [PurchaseOrderController::class, 'purchaseOrderForDropdown']);
            Route::get('/product-purchase-returns', [PurchaseOrderReturnController::class, 'purchaseOrderReturnForDropdown']);
            Route::get('/sales-orders', [SalesOrderController::class, 'salesOrderForDropdown']);
            Route::get('/purchase-orders', [PurchaseOrderController::class, 'purchaseOrderForDropdown']);
        });

        //Slug Checker and Get
        Route::group(['prefix' => 'slug-checkpoint'], static function () {
            Route::get('/category', [CategoryController::class, 'checkSlug']);
            Route::get('/brand', [BrandController::class, 'checkSlug']);
            Route::get('/product', [ProductController::class, 'checkSlug']);
            Route::get('/ingredient', [IngredientController::class, 'checkSlug']);
        });

        // Duplicate entry Checkpoint
        Route::group(['prefix' => 'duplicate-checkpoint'], static function () {
            Route::get("/sku", [ProductController::class, 'checkSkuExistence']);
            Route::get("/sku", [IngredientController::class, 'checkSkuExistence']);
        });

        // Data Grid routes
        Route::group(['prefix' => 'grid'], static function () {
            Route::get('/users', [UserController::class, 'index']);
            Route::get('/customers', [CustomerController::class, 'index']);
            Route::get('/user-roles', [UserRoleController::class, 'index']);
            Route::get('/suppliers', [SupplierController::class, 'index']);
            Route::get('/brands', [BrandController::class, 'index']);
            Route::get('/categories', [CategoryController::class, 'index']);
            Route::get('/units', [UnitController::class, 'index']);
            Route::get('/products', [ProductController::class, 'index']);
            Route::get('/ingredient-categories', [IngredientCategoryController::class, 'index']);
            Route::get('/ingredients', [IngredientController::class, 'index']);
            Route::get('/ingredient-stock', [IngredientController::class, 'ingredientStock']);
            Route::get('/store-front-sliders', [StoreFrontSliderController::class, 'index']);
            Route::get('/social-links', [SocialLinkController::class, 'index']);
            Route::get('/table-bookings', [TableBookingController::class, 'index']);
            Route::get('/ingredient-purchases', [IngredientPurchaseController::class, 'index']);
            Route::get('/ingredient-uses', [IngredientUsesController::class, 'index']);
            Route::get('/account-categories', [AccountController::class, 'categoriesIndex']);
            Route::get('/account-heads', [AccountController::class, 'headIndex']);
            Route::get('/accounting-histories', [AccountingHistoryController::class, 'index']);
            Route::get('/product-purchases', [PurchaseOrderController::class, 'index']);
            Route::get('/product-purchase-returns', [PurchaseOrderReturnController::class, 'index']);
            Route::get('/sales-orders', [SalesOrderController::class, 'index']);
            Route::get('/sales-order-returns', [SalesOrderReturnController::class, 'index']);
            Route::get('/customer-payments', [CustomerPaymentController::class, 'index']);
            Route::get('/supplier-payments', [SupplierPaymentController::class, 'index']);

        });

        // For Saving/Updating Data
        Route::group(['prefix' => 'save'], static function () {
            Route::post('/user', [UserController::class, 'save']);
            Route::post('/customer', [CustomerController::class, 'save']);
            Route::post('/user-role', [UserRoleController::class, 'save']);
            Route::post('/supplier', [SupplierController::class, 'save']);
            Route::post('/brand', [BrandController::class, 'save']);
            Route::post('/category', [CategoryController::class, 'save']);
            Route::post('/category/single-property', [CategoryController::class, 'saveCategorySingleProperty']);
            Route::post('/unit', [UnitController::class, 'save']);
            Route::post('/product', [ProductController::class, 'save']);
            Route::post('/ingredient-category', [IngredientCategoryController::class, 'save']);
            Route::post('/ingredient', [IngredientController::class, 'save']);
            Route::post('/store-front-slider', [StoreFrontSliderController::class, 'save']);
            Route::post('/social-link', [SocialLinkController::class, 'save']);
            Route::post('/table-booking', [TableBookingController::class, 'save']);
            Route::post('/ingredient-purchase', [IngredientPurchaseController::class, 'save']);
            Route::post('/ingredient-uses', [IngredientUsesController::class, 'saveUses']);
            Route::post('/account-head', [AccountController::class, 'saveHead']);
            Route::post('/account-category', [AccountController::class, 'saveCategory']);
            Route::post('/account-history', [AccountController::class, 'saveCategory']);
            Route::post('/accounting-history', [AccountingHistoryController::class, 'save']);
            Route::post('/accounting-settings', [AccountingSettingsController::class, 'save']);
            Route::post('/product-purchase', [PurchaseOrderController::class, 'save']);
            Route::post('/product-purchase-return', [PurchaseOrderReturnController::class, 'save']);
            Route::post('/sales-order', [SalesOrderController::class, 'save']);
            Route::post('/sales-order-return', [SalesOrderReturnController::class, 'save']);
            Route::post('/customer-payment', [CustomerPaymentController::class, 'save']);
            Route::post('/supplier-payment', [SupplierPaymentController::class, 'save']);
        });

        // For deleting data
        Route::group(['prefix' => 'delete'], static function () {
            Route::delete('/user', [UserController::class, 'delete']);
            Route::delete('/customer', [CustomerController::class, 'delete']);
            Route::delete('/user-role', [UserRoleController::class, 'delete']);
            Route::delete('/supplier', [SupplierController::class, 'delete']);
            Route::delete('/brand', [BrandController::class, 'delete']);
            Route::delete('/categories', [CategoryController::class, 'delete']);
            Route::delete('/store-front-slider', [StoreFrontSliderController::class, 'delete']);
            Route::delete('/social-link', [SocialLinkController::class, 'delete']);
            Route::delete('/table-booking', [TableBookingController::class, 'delete']);
            Route::delete('/ingredient-uses', [IngredientUsesController::class, 'delete']);
            Route::delete('/ingredient-uses', [IngredientUsesController::class, 'delete']);
            Route::delete('/account-category', [AccountController::class, 'deleteCategory']);
            Route::delete('/account-head', [AccountController::class, 'deleteHead']);
            Route::delete('/accounting-history', [AccountingHistoryController::class, 'delete']);
            Route::delete('/purchase-order', [PurchaseOrderController::class, 'delete']);
            Route::delete('/purchase-order-return', [PurchaseOrderReturnController::class, 'delete']);
            Route::delete('/sales-order', [SalesOrderController::class, 'delete']);
            Route::delete('/sales-order-return', [SalesOrderReturnController::class, 'delete']);
            Route::delete('/customer-payment', [SalesOrderReturnController::class, 'delete']);
            Route::delete('/supplier-payment', [SupplierPaymentController::class, 'delete']);
        });

// Store Information Data
        Route::get('/ingredient-order-generate-particulars', [IngredientPurchaseController::class, 'generateParticulars']);
        Route::get('/product-purchase-order-generate-particulars', [PurchaseOrderController::class, 'generateParticulars']);
        Route::get('/product-purchase-return-order-generate-particulars', [PurchaseOrderReturnController::class, 'generateParticulars']);
        Route::get('/sales-order-generate-particulars', [SalesOrderController::class, 'generateParticulars']);
        Route::get('/sales-order-return-generate-particulars', [SalesOrderReturnController::class, 'generateParticulars']);

//    Booking Status Update
        Route::post('/booking-status-update', [TableBookingController::class, 'statusUpdate']);
// Check Ingredient Stock
        Route::get('/check-ingredient-stock', [IngredientUsesController::class, 'checkStock']);
//    Customer Info By uuid
        Route::get('/customer-info', [CustomerController::class, 'customerInfoByUUID']);
        // Division List
        Route::get('/divisions', [StoreInformationController::class, 'getDivisions']);
        // District List By Division ID
        Route::get('/districts', [StoreInformationController::class, 'getDistricts']);
        // Upazila List By District ID
        Route::get('/upazilas', [StoreInformationController::class, 'getUpazilas']);

        // Accounting Settings
        Route::get('/accounting-settings', [AccountingSettingsController::class, 'getAccountingSettings']);
        // Accounting Settings
        Route::get('/accounting-settings', [AccountingSettingsController::class, 'getAccountingSettings']);

        Route::get('/customer-due', [CustomerPaymentController::class, 'getDueAmount']);
        Route::get('/supplier-due', [SupplierPaymentController::class, 'getDueAmount']);

        //For Attachment Uploads
        Route::post('/upload', [UploadController::class, 'upload']);
    });

// Store Information Data
            Route::get('/store-information', [StoreInformationController::class, 'index']);

// Store Information Data
            Route::get('/ingredient-order-generate-particulars', [IngredientPurchaseController::class, 'generateParticulars']);
            Route::get('/product-purchase-order-generate-particulars', [PurchaseOrderController::class, 'generateParticulars']);
            Route::get('/product-purchase-return-order-generate-particulars', [PurchaseOrderReturnController::class, 'generateParticulars']);
            Route::get('/sales-order-generate-particulars', [SalesOrderController::class, 'generateParticulars']);
            Route::get('/sales-order-return-generate-particulars', [SalesOrderReturnController::class, 'generateParticulars']);
            Route::get('/wastage-generate-particulars', [WastageController::class, 'generateParticulars']);

//    Booking Status Update
            Route::post('/booking-status-update', [TableBookingController::class, 'statusUpdate']);
// Check Ingredient Stock
            Route::get('/check-ingredient-stock', [IngredientUsesController::class, 'checkStock']);
//    Customer Info By uuid
            Route::get('/customer-info', [CustomerController::class, 'customerInfoByUUID']);
            // Division List
            Route::get('/divisions', [StoreInformationController::class, 'getDivisions']);
            // District List By Division ID
            Route::get('/districts', [StoreInformationController::class, 'getDistricts']);
            // Upazila List By District ID
            Route::get('/upazilas', [StoreInformationController::class, 'getUpazilas']);

            // Accounting Settings
            Route::get('/accounting-settings', [AccountingSettingsController::class, 'getAccountingSettings']);
            Route::get('/product', [ProductController::class, 'getProductByUuid']);
            // Accounting Settings
            Route::get('/accounting-settings', [AccountingSettingsController::class, 'getAccountingSettings']);

            //Daily hand balance
            Route::get('/hand-balance', [ReportController::class, 'handBalance']);

//Dashboard Data
            Route::get('/dashboard-details', [DashboardController::class, 'getData']);
            Route::get('/top-products', [DashboardController::class, 'topProduct']);

            // Due Amount
            Route::get('/customer-due', [CustomerPaymentController::class, 'getDueAmount']);
            Route::get('/supplier-due', [SupplierPaymentController::class, 'getDueAmount']);


            //For Kitchen Panel API


            //For Attachment Uploads
            Route::post('/upload', [UploadController::class, 'upload']);

        });
    });
});
