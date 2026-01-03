<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Course; // 1. On importe Course au lieu de Lesson

class ProgressionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            
            // 2. On lie au cours (course_id) et non plus à la leçon
            'course_id' => Course::factory(), 
            
            // 3. Le statut doit correspondre à ton ENUM ('EN_COURS', 'TERMINE', 'ABANDONNE')
            'status' => 'TERMINE', 
            
            // 4. Ajout du pourcentage (puisque c'est dans ta table)
            'percentage' => 100.00,
            
            // 5. On renomme finished_at en completed_at
            'completed_at' => now(), 
            
            // 6. On ajoute started_at (requis ou utile)
            'started_at' => now()->subDays(2),
        ];
    }
}