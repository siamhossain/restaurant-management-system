<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DocCodeIncrements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc_code_increments', function (Blueprint $table) {
            $table->id();
            $table->enum('module_code', ['USER','SUPPLIER','CUSTOMER', 'BRAND', 'UNIT', 'PRODUCT', 'CATEGORY', 'ACCOUNTING_HISTORY', 'DUE', 'SALES_ORDER', 'SALES_ORDER_RETURN', 'CUSTOMER_PAYMENT', 'SUPPLIER_PAYMENT', 'INGREDIENT','INGREDIENT_PURCHASE', 'INGREDIENT_USES', 'INCOME', 'EXPENSE', 'PURCHASE_ORDER', 'PURCHASE_ORDER_RETURN', 'WASTAGE', 'BOOKING']);
            $table->bigInteger('last_increment');
            $table->string('last_increment_code');
            $table->string('deleted_at', 255)->nullable()->default('');
            $table->unique(['module_code']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doc_code_increments');
    }
}
