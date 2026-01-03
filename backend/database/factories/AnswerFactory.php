<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Question;

class AnswerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'question_id' => Question::factory(),
            'text' => fake()->sentence(3),
            'is_correct' => fake()->boolean(25), // 25% de chance d'être la bonne réponse
        ];
    }
}