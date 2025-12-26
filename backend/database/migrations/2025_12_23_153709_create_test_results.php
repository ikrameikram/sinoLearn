<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('hsk_tests_id')->constrained('hsk_tests')->onDelete('cascade');
            $table->integer('score')->nullable();
            $table->integer('max_score')->default(200);
            $table->boolean('is_passed')->default(false);
            $table->integer('duration')->nullable();
            $table->enum('status', ['en_cours', 'termine', 'abandonne'])->default('en_cours');
            $table->integer('listening_score')->default(0);
            $table->integer('reading_score')->default(0);
            $table->timestamps(); 
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('test_results');
    }
};
