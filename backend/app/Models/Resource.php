<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lesson;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'title',
        'type', // 'PDF', 'AUDIO', 'VIDEO', 'LINK'
        'url',
    ];

    // Relation : Une ressource appartient à une seule leçon
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}