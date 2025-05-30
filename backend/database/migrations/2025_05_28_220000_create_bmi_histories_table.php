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
        Schema::create('bmi_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('bmi', 5, 2);
            $table->string('category');
            $table->decimal('height', 8, 2); // Height in appropriate units (e.g., cm or inches)
            $table->decimal('weight', 8, 2); // Weight in appropriate units (e.g., kg or lbs)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bmi_histories');
    }
}; 