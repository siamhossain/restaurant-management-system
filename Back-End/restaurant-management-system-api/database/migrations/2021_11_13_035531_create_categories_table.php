<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 10)->unique();
            $table->uuid('parent_cat_uuid')->nullable()->default('');
            $table->string('slug', 255)->nullable()->unique();
            $table->boolean('is_featured')->default(0);
            $table->string('name', 255)->nullable();
            $table->longText('description')->nullable();
            $table->mediumText('image_uri')->nullable();
            $table->mediumText('banner_image_uri')->nullable();
            $table->text('banner_text')->nullable();
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->string('ip')->nullable();
            $table->string('agent')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->uuid('created_by_uuid')->nullable()->default('');
            $table->uuid('updated_by_uuid')->nullable()->default('');
            $table->uuid('deleted_by_uuid')->nullable()->default('');
            $table->timestamps();
            $table->string('deleted_at', 255)->nullable()->default('');
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
        Schema::dropIfExists('categories');
    }
}
