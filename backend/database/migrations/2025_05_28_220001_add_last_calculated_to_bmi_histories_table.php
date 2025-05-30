<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bmi_histories', function (Blueprint $table) {
            $table->timestamp('last_calculated')->nullable(); // Add the last_calculated column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bmi_histories', function (Blueprint $table) {
            $table->dropColumn('last_calculated');
        });
    }
}; 