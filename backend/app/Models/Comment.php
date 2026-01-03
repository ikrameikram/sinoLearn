<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\ForumPost;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'forum_post_id',
        'content',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Relation : Le commentaire appartient à un User (l'auteur)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relation : Le commentaire appartient à un Sujet spécifique
    public function forumPost(): BelongsTo
    {
        return $this->belongsTo(ForumPost::class);
    }
}