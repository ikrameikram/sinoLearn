<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Question;
use App\Models\TestResult;

class HskTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',            // Ex: "HSK 1 - Test Blanc 1"
        'level',            // 1, 2, 3...
        'duration_minutes', // Ex: 40
        'min_score',        // Score minimum pour valider (ex: 120)
    ];

    protected $casts = [
        'level' => 'integer',
        'duration_minutes' => 'integer',
        'min_score' => 'integer',
    ];

    // Relation : Un test contient plusieurs Questions
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    // Relation : Un test a été passé plusieurs fois (Résultats)
    public function testResults(): HasMany
    {
        return $this->hasMany(TestResult::class);
    }
}