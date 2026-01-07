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
        'title',           
        'level',            
        'duration_minutes', 
        'min_score',        
    ];

    protected $casts = [
        'level' => 'integer',
        'duration_minutes' => 'integer',
        'min_score' => 'integer',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function testResults(): HasMany
    {
        return $this->hasMany(TestResult::class);
    }
}