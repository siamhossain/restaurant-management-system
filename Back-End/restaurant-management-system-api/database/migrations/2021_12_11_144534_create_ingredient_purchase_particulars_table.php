<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateIngredientPurchaseParticularsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredient_purchase_particulars', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->uuid('ingredient_purchase_uuid');
            $table->uuid('ingredient_uuid');
            $table->string('ingredient_code' , 255);
            $table->string('ingredient_name', 255);
            $table->double('quantity', 18, 2)->default(0);
            $table->double('unit_price', 18, 2)->default(0);
            $table->double('total_price', 18, 2)->default(0);
            $table->double('discount', 18, 2)->default(0);
            $table->double('total_amount', 18, 2)->default(0);
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
        Schema::dropIfExists('ingredient_purchase_particulars');
    }
}
