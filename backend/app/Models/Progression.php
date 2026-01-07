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
    protected $fillable = [
        'user_id',
        'course_id',
        'status',      
        'percentage',  
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'percentage' => 'float', 
        'started_at' => 'datetime',
        'completed_at' => 'datetime', 
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}