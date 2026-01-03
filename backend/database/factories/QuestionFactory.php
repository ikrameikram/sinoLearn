<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\HskTest;
class QuestionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'hsk_test_id' => HskTest::factory(),
            'content' => 'Quelle est la signification de : ' . fake()->word() . ' ?',
            'type' => fake()->randomElement(['ECOUTE', 'LECTURE', 'ECRITURE', 'COMPREHENSION']),
            'score' => 5,
        ];
    }
}