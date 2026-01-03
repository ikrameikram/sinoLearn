<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class ProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'bio' => fake()->paragraph(),
            'photo' => fake()->imageUrl(100, 100, 'people'),
            'target_hsk_level' => fake()->numberBetween(1, 6),
        ];
    }
}