<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFields1InUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('agency_id')->nullable();
            $table->string('user_type')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('surrogacy_type')->nullable();
            $table->boolean('is_first_surrogacy_journey')->nullable();
            $table->boolean('is_working_with_agency')->nullable();
            $table->string('date_of_birth')->nullable();
            $table->boolean('have_frozen_embryos')->nullable();
            $table->boolean('have_children')->nullable();
            $table->integer('height')->nullable();
            $table->integer('weight')->nullable();
            $table->string('when_to_start_journey')->nullable();
            $table->string('relationship_status')->nullable();
            $table->string('willing_to_help_types')->nullable();
            $table->boolean('is_smoke_or_tobacco')->nullable();
            $table->boolean('is_willing_to_travel')->nullable();
            $table->string('assisted_groups')->nullable();
            $table->text('about')->nullable();
            $table->string('picture')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('website')->nullable();
            $table->string('socal_media')->nullable();
            $table->string('services_provided')->nullable();
            $table->string('surrogate_matching_time')->nullable();
            $table->string('membership_affilations')->nullable();
            $table->string('journey_length')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
