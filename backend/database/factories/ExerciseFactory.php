<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lesson;

class ExerciseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory(),
            'type' => fake()->randomElement(['QCM', 'TEXT_A_TROU', 'PRONONCIATION', 'ECRITURE']),
            'instruction' => 'Consigne : ' . fake()->sentence(),
            'content' => [
                'question' => fake()->sentence() . ' ?',
                'options' => [fake()->word(), fake()->word(), fake()->word()], 
                'correct' => fake()->word(), 
            ],
            
            'points' => fake()->numberBetween(5, 20),
            'hsk_level' => fake()->numberBetween(1, 6),
        ];
    }
}