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
        'content',     
        'type',        
        'score',      
    ];

    
    public function hskTest(): BelongsTo
    {
        return $this->belongsTo(HskTest::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }
}