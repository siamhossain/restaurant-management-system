<?php

use App\Http\Controllers\Admin\StoreInformationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1/store-front'], static function () {
    Route::get('/store-information', [StoreInformationController::class, 'index']);
});
