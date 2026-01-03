<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

// IMPORTS : N'oublie pas d'importer les modèles liés
use App\Models\Course;
use App\Models\Exercise;
use App\Models\Resource;

class Lesson extends Model
{
    use HasFactory;

    // 1. Les champs modifiables
    protected $fillable = [
        'course_id',
        'title',
        'description',
    ];

    // 2. Relation : La leçon appartient à un Cours
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    // 3. Relation : La leçon contient plusieurs Exercices
    public function exercises(): HasMany
    {
        return $this->hasMany(Exercise::class);
    }

    // 4. Relation : La leçon a plusieurs Ressources (PDF, Vidéos...)
    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }
}