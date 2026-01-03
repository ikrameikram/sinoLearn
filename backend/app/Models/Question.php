<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\HskTest;
use App\Models\Answer;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'hsk_test_id',
        'content',     // Le texte de la question
        'type',        // 'ECOUTE', 'LECTURE', 'ECRITURE', 'COMPREHENSION'
        'score',       // Points valant pour cette question (ex: 5)
    ];

    // Relation : La question appartient à un test HSK spécifique
    public function hskTest(): BelongsTo
    {
        return $this->belongsTo(HskTest::class);
    }

    // Relation : Une question a plusieurs réponses possibles (pour les QCM)
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }
}