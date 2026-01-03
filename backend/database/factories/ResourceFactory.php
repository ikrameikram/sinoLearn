<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lesson;

class ResourceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory(),
            'title' => 'Fiche vocabulaire : ' . fake()->word(),
            'type' => fake()->randomElement(['PDF', 'AUDIO', 'VIDEO']),
            'url' => fake()->url(),
        ];
    }
}