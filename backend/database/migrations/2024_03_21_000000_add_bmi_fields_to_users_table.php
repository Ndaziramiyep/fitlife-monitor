<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('bmi', 5, 2)->nullable();
            $table->string('bmi_category')->nullable();
            $table->timestamp('last_bmi_calculation')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['bmi', 'bmi_category', 'last_bmi_calculation']);
        });
    }
}; 