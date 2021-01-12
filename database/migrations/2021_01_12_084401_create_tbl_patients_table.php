<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('dob');
            $table->text('comments');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('gender_id');

            $table->foreign('gender_id')
                ->references('id')->on('tbl_genders');

            $table->foreign('service_id')
                ->references('id')->on('tbl_services');
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
        Schema::dropIfExists('tbl_patients');
    }
}
