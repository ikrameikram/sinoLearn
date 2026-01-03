<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\HskTest;

class TestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'hsk_test_id',
        'score',
        'max_score',
        'is_passed',
        'duration',         // Temps mis en secondes ou minutes
        'status',           // 'en_cours', 'termine', 'abandonne'
        'listening_score',  // Score partie écoute
        'reading_score',    // Score partie lecture
    ];

    protected $casts = [
        'is_passed' => 'boolean', // Convertit 0/1 en false/true
        'score' => 'integer',
        'max_score' => 'integer',
    ];

    // Relation : Le résultat appartient à un User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relation : Le résultat concerne un test HSK spécifique
    public function hskTest(): BelongsTo
    {
        return $this->belongsTo(HskTest::class);
    }
}