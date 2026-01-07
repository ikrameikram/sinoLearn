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
        'type',        
        'instruction', 
        'content',
        'points',
        'hsk_level',
    ];
    protected $casts = [
        'content' => 'array', 
        'points' => 'integer',
        'hsk_level' => 'integer',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}