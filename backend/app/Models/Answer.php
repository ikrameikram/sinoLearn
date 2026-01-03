<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Question;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'text',       // Le texte de la réponse (ex: "A. Pékin")
        'is_correct', // Indique si c'est la bonne réponse (0 ou 1)
    ];

    protected $casts = [
        'is_correct' => 'boolean', // Convertit 0/1 en false/true
    ];

    // Relation : Cette réponse appartient à une question spécifique
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}