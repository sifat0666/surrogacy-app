<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStripePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stripe_plans', function (Blueprint $table) {
            $table->id();
            $table->string('ip_monthly_id');
            $table->string('ip_monthly_price');
            $table->string('ip_quarterly_id');
            $table->string('ip_quarterly_price');
            $table->string('ip_yearly_id');
            $table->string('ip_yearly_price');
            $table->string('ag_monthly_id');
            $table->string('ag_monthly_price');
            $table->string('ag_quarterly_id');
            $table->string('ag_quarterly_price');
            $table->string('ag_yearly_id');
            $table->string('ag_yearly_price');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stripe_plans');
    }
}
