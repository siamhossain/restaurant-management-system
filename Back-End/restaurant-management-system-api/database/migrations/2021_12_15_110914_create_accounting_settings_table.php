<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAccountingSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounting_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->boolean('auto_accounting_entry')->default(0);
            $table->uuid('cash_sales_category_uuid');
            $table->uuid('cash_sales_head_uuid');
            $table->uuid('cash_purchase_category_uuid');
            $table->uuid('cash_purchase_head_uuid');
            $table->uuid('customer_payment_category_uuid');
            $table->uuid('customer_payment_head_uuid');
            $table->uuid('supplier_payment_category_uuid');
            $table->uuid('supplier_payment_head_uuid');
            $table->uuid('created_by_uuid')->nullable()->default('');
            $table->uuid('updated_by_uuid')->nullable()->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounting_settings');
    }
}
