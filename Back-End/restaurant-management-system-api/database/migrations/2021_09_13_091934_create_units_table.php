<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 10)->unique();
            $table->string('name', 255)->nullable();
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->string('deleted_at', 255)->nullable()->default('');
            $table->string('created_by_uuid', 255)->nullable()->default('');
            $table->string('updated_by_uuid', 255)->nullable()->default('');
            $table->string('deleted_by_uuid', 255)->nullable()->default('');
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
        Schema::dropIfExists('units');
    }
}
