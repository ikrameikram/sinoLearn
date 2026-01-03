<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
public function up(): void
{
    Schema::create('progressions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('course_id')->constrained()->onDelete('cascade');
        $table->enum('status', ['EN_COURS', 'TERMINE', 'ABANDONNE'])->default('EN_COURS');
        $table->decimal('percentage', 5, 2)->default(0.00);
        $table->timestamp('started_at')->useCurrent();
        $table->timestamp('completed_at')->nullable();
        $table->timestamps();
        $table->unique(['user_id', 'course_id']);
    });
}
    public function down(): void
    {
        Schema::dropIfExists('progressions');
    }
};
