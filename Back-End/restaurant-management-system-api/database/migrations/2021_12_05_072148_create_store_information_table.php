<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateStoreInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_information', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('name', 255)->nullable();
            $table->mediumText('slogan')->nullable();
            $table->longText('about')->nullable();
            $table->mediumText('logo_uri')->nullable();
            $table->mediumText('banner_uri')->nullable();
            $table->string('website')->nullable();
            $table->string('email', 255)->nullable();
            $table->string('phone_1', 50)->nullable();
            $table->string('phone_2', 50)->nullable();
            $table->mediumText('address_one')->nullable();
            $table->mediumText('address_two')->nullable();
            $table->mediumText('address_three')->nullable();
            $table->string('deleted_at', 255)->nullable()->default('');
            $table->string('division_id', 255)->nullable()->default('');
            $table->string('district_id', 255)->nullable()->default('');
            $table->string('upazila_id', 255)->nullable()->default('');
            $table->string('zip_code', 255)->nullable()->default('');
            $table->string('post_office', 255)->nullable()->default('');
            $table->enum('status', ['Active', 'Inactive', 'Banned'])->default('Active');
            $table->integer('sms_balance')->default(0);
            $table->integer('email_balance')->default(0);
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->uuid('created_by_uuid')->nullable()->default('');
            $table->uuid('updated_by_uuid')->nullable()->default('');
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
        Schema::dropIfExists('store_information');
    }
}
