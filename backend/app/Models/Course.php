<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Lesson;
use App\Models\Progression;

class Course extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'hsk_level',
        'duration',
    ];

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    public function progressions(): HasMany
    {
        return $this->hasMany(Progression::class);
    }
}