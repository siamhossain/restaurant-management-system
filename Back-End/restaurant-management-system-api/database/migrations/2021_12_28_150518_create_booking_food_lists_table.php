<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateBookingFoodListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_food_lists', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->uuid('booking_uuid');
            $table->string('category_name', 255);
            $table->uuid('food_category_uuid');
            $table->uuid('food_uuid');
            $table->string('food_name', 255);
            $table->double('price', 18, 2);
            $table->double('total_price', 18, 2);
            $table->double('quantity', 18, 2);
            $table->enum('status', ['Pending', 'Inprogress', 'Ready', 'Served'])->default('Pending');
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
        Schema::dropIfExists('booking_food_lists');
    }
}
