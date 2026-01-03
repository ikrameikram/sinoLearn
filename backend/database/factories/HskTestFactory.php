<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class HskTestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => 'Test Blanc HSK Niveau ' . fake()->numberBetween(1, 6),
            'level' => fake()->numberBetween(1, 6),
            'duration_minutes' => fake()->numberBetween(30, 120), 
            'min_score' => 120, 
        ];
    }
}