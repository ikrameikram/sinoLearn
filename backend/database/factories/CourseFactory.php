<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => 'Cours HSK : ' . fake()->sentence(3),
            'description' => fake()->paragraph(),
            'hsk_level' => fake()->numberBetween(1, 6),
            'duration' => fake()->numberBetween(30, 180),
        ];
    }
}