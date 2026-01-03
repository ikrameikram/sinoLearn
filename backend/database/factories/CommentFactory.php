<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\ForumPost;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'forum_post_id' => ForumPost::factory(),
            'content' => fake()->paragraph(),
            'published_at' => now(),
        ];
    }
}