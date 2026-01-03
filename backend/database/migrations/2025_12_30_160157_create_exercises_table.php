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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['QCM', 'TEXT_A_TROU', 'PRONONCIATION', 'ECRITURE']);
            $table->string('instruction');
            $table->json('content'); 
            $table->integer('points')->default(10); 
            $table->integer('hsk_level')->index();
            $table->timestamps();
    });
}

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
