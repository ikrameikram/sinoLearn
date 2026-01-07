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
            'score' => fake()->numberBetween(50, 200),
            'max_score' => 200,
            'listening_score' => fake()->numberBetween(25, 100),
            'reading_score' => fake()->numberBetween(25, 100),
            'status' => fake()->randomElement(['termine', 'abandonne']),
            'is_passed' => fake()->boolean(),
            'duration' => fake()->numberBetween(30, 120),
        ];
    }
}