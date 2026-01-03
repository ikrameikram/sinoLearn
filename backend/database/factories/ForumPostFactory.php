<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class ForumPostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Un post est écrit par un user
            'subject' => fake()->sentence(),
            'content' => fake()->paragraph(),
            'category' => fake()->randomElement(['grammaire', 'vocabulaire', 'culture']),
            'is_resolved' => fake()->boolean(),
            'published_at' => now(),
        ];
    }
}