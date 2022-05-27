<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code')->unique();
            $table->uuid('customer_uuid')->nullable();
            $table->date('date')->nullable();
            $table->double('total_amount', 18,2)->default(0);
            $table->double('discount', 18,2)->default(0);
            $table->double('payable_amount', 18,2)->default(0);
            $table->double('received_amount', 18,2)->default(0);
            $table->double('return_amount', 18,2)->default(0);
            $table->double('due_amount', 18,2)->default(0);
            $table->double('paid_amount', 18,2)->default(0);
            $table->double('vat', 18,2)->default(0);
            $table->double('tax', 18,2)->default(0);
            $table->enum('payment_type', ['Cash', 'Credit'])->default('Cash');
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Active');
            $table->enum('sales_type', ['Parcel', 'Table_Sale'])->default('Parcel');
            $table->uuid('user_uuid')->nullable();
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->string('deleted_at', 255)->nullable()->default('');
            $table->uuid('created_by_uuid')->nullable()->default('');
            $table->uuid('updated_by_uuid')->nullable()->default('');
            $table->uuid('deleted_by_uuid')->nullable()->default('');
            $table->timestamps();
            $table->unique(['id', 'uuid']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_orders');
    }
}
