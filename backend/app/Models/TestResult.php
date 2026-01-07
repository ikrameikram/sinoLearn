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
        'duration',         
        'status',          
        'listening_score',
        'reading_score', 
    ];

    protected $casts = [
        'is_passed' => 'boolean',
        'score' => 'integer',
        'max_score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hskTest(): BelongsTo
    {
        return $this->belongsTo(HskTest::class);
    }
}