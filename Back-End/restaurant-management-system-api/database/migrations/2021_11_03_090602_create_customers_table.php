<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 255)->nullable();
            $table->string('name', 255)->nullable();
            $table->string('email', 255)->unique()->nullable();
            $table->mediumText('address')->nullable();
            $table->string('phone_number')->nullable();
            $table->mediumText('profile_image_uri')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->enum('status', ['Active', 'Inactive', 'Banned']);
            $table->string('area_code')->nullable();
            $table->string('password')->nullable();
            $table->string('deleted_at')->nullable();
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->uuid('created_by_uuid')->nullable();
            $table->uuid('updated_by_uuid')->nullable();
            $table->uuid('deleted_by_uuid')->nullable();
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
        Schema::dropIfExists('customers');
    }
}
