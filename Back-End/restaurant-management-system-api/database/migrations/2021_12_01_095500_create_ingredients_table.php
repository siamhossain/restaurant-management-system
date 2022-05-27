<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 255)->nullable();
            $table->uuid('category_uuid')->nullable();
            $table->uuid('unit_uuid')->nullable();
            $table->string('title', 255);
            $table->string('slug', 255);
            $table->mediumText('description')->nullable();
            $table->mediumText('featured_video_id')->nullable();
            $table->mediumText('featured_image_uri')->nullable();
            $table->double('purchase_price', 18,2)->default(0);
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->double('min_stock', 18, 2)->default(0);
            $table->string('barcode', 255)->nullable();
            $table->string('sku', 255)->nullable();
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
        Schema::dropIfExists('ingredient_purchase_summary');
    }
}
