<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\HskTest;

class TestResultFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'hsk_test_id' => HskTest::factory(),
            
            // Les scores (Total + Détails comme dans ta migration)
            'score' => fake()->numberBetween(50, 200),
            'max_score' => 200,
            'listening_score' => fake()->numberBetween(25, 100),
            'reading_score' => fake()->numberBetween(25, 100),
            
            // Le statut (On respecte ton Enum : 'en_cours', 'termine', 'abandonne')
            'status' => fake()->randomElement(['termine', 'abandonne']),
            
            // Réussite (Boolean)
            'is_passed' => fake()->boolean(),
            
            // Durée (Integer)
            'duration' => fake()->numberBetween(30, 120),
            
            
        ];
    }
}