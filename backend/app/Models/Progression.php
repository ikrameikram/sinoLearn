<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// IMPORTS
use App\Models\User;
use App\Models\Course;

class Progression extends Model
{
    use HasFactory;

    // 1. Les champs modifiables (correspondent à ta table 'progressions')
    protected $fillable = [
        'user_id',
        'course_id',
        'status',      // 'EN_COURS', 'TERMINE', 'ABANDONNE'
        'percentage',  // Ex: 50.00
        'started_at',
        'completed_at',
    ];

    // 2. Casts : Pour que Laravel formate automatiquement les types
    protected $casts = [
        'percentage' => 'float', // Convertit "50.00" (string) en 50.0 (nombre)
        'started_at' => 'datetime',
        'completed_at' => 'datetime', // Permet de faire $progression->completed_at->format('d/m/Y')
    ];

    // 3. Relation : Cette progression appartient à un User (l'élève)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // 4. Relation : Cette progression concerne un Course (le cours)
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}