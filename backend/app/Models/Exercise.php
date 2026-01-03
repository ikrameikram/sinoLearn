<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lesson;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'type',        // 'QCM', 'TEXT_A_TROU', etc.
        'instruction', // Consigne de l'exercice
        'content',     // Le coeur de l'exercice (Questions/Réponses)
        'points',
        'hsk_level',
    ];

    /**
     * Les "Casts" permettent de convertir automatiquement les données.
     * Ici, la colonne 'content' (qui est du JSON dans la BD)
     * sera convertie en Tableau (Array) dès qu'on l'utilise en PHP.
     */
    protected $casts = [
        'content' => 'array', 
        'points' => 'integer',
        'hsk_level' => 'integer',
    ];

    // Relation : Un exercice appartient à une leçon
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}