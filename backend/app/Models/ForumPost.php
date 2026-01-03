<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\Comment;

class ForumPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'content',
        'category',      // 'grammaire', 'vocabulaire', 'culture'
        'is_resolved',   // Indique si la question a trouvé une réponse
        'published_at',
    ];

    protected $casts = [
        'is_resolved' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Relation : Un post appartient à un utilisateur (l'auteur)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relation : Un post a plusieurs commentaires (réponses)
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}