<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Course;

class ProgressionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(), 
            'status' => 'TERMINE', 
            'percentage' => 100.00,
            'completed_at' => now(), 
            'started_at' => now()->subDays(2),
        ];
    }
}