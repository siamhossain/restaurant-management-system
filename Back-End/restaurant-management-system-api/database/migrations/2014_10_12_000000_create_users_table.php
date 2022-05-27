<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->uuid('role_id')->nullable();
            $table->string('code', 10)->unique();
            $table->string('name')->nullable();
            $table->string('username')->unique();
            $table->string('phone')->unique();
            $table->mediumText('address')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('password');
            $table->enum('status', ['Active', 'Inactive', 'Banned'])->default('Active');
            $table->boolean('is_deleted')->default(0);
            $table->string('deleted_at')->nullable();
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->uuid('created_by_uuid')->nullable();
            $table->uuid('updated_by_uuid')->nullable();
            $table->uuid('deleted_by_uuid')->nullable();
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
        Schema::dropIfExists('users');
    }
}
