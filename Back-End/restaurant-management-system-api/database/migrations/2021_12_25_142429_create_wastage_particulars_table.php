<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWastageParticularsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wastage_particulars', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->uuid('wastage_uuid');
            $table->uuid('product_uuid');
            $table->string('product_title')->nullable();
            $table->double('qty', 18,2)->default(0);
            $table->double('unit_price', 18,2)->default(0);
            $table->double('discount', 18,2)->default(0);
            $table->double('total_amount', 18,2)->default(0);
            $table->boolean('is_deleted')->default(0);
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
        Schema::dropIfExists('wastage_particulars');
    }
}
