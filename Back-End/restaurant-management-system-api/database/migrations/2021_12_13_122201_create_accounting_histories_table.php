<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAccountingHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounting_histories', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->default(DB::raw('uuid()'));
            $table->string('code', 10)->unique();
            $table->boolean('is_auto_entry')->default(0);
            $table->uuid('account_category_uuid');
            $table->string('account_category_name')->nullable();
            $table->uuid('account_head_uuid');
            $table->string('account_head_name')->nullable();
            $table->enum('type', ['Income', 'Expense']);
            $table->mediumText('comment')->nullable();
            $table->double('total_amount', 18, 2);
            $table->date('date')->default(DB::raw("CURRENT_DATE()"));
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
        Schema::dropIfExists('accounting_histories');
    }
}
