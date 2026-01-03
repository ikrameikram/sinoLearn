<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forum_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('subject'); 
            $table->text('content'); 
            $table->enum('category', ['grammaire', 'vocabulaire', 'culture'])->default('culture');
            $table->boolean('is_resolved')->default(false); 
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('forum_posts');
    }
};