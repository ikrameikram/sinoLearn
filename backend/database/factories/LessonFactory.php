<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Course;

class LessonFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Crée un cours automatiquement si aucun n'est fourni
            'course_id' => Course::factory(), 
            'title' => 'Leçon : ' . fake()->sentence(4),
            'description' => fake()->text(),
        ];
    }
}