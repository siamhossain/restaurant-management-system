<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTableBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_bookings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 20)->nullable();
            $table->string('name', 255)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('phone', 255)->nullable();
            $table->date('date');
            $table->time('time');
            $table->uuid('customer_uuid');
            $table->integer('person')->default(0);
            $table->enum('occasion', ['Birthday', 'Anniversary', 'Date', 'Special Occasion', 'Business Meal', 'Other'])->nullable();
            $table->enum('status', ['Placed', 'Accept', 'Cancel'])->default('Placed');
            $table->mediumText('message')->nullable();
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
        Schema::dropIfExists('table_bookings');
    }
}
