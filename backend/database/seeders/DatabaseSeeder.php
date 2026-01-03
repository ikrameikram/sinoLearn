<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Resource;
use App\Models\Exercise;
use App\Models\HskTest;
use App\Models\Question;
use App\Models\Answer;
use App\Models\TestResult;
use App\Models\Progression;
use App\Models\ForumPost;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création de l'Admin
        $admin = User::factory()
            ->has(Profile::factory()) 
            ->create([
                'name' => 'Admin User',
                'email' => 'admin@test.com',
                'password' => bcrypt('password'), 
                'role' => 'admin', 
            ]);

        // 2. Création de l'Étudiant de test
        $etudiant = User::factory()
            ->has(Profile::factory())
            ->create([
                'name' => 'Etudiant Test',
                'email' => 'etudiant@test.com',
                'password' => bcrypt('password'),
                'role' => 'etudiant', // ou 'student' selon ta convention
            ]);

        // 3. Création d'autres utilisateurs random
        User::factory(10)
            ->has(Profile::factory())
            ->create();

        // 4. Création des Cours avec Leçons, Ressources et Exercices
        $courses = Course::factory(5)
            ->has(
                Lesson::factory()
                    ->count(8) // 8 leçons par cours
                    ->has(Resource::factory()->count(2)) 
                    ->has(Exercise::factory()->count(3))
            )
            ->create();

        // 5. Création des Tests HSK avec Questions et Réponses
        $tests = HskTest::factory(3)
            ->has(
                Question::factory()
                    ->count(10) 
                    ->has(Answer::factory()->count(4)) 
            )
            ->create();

        // 6. Création de résultats de test pour l'étudiant
        TestResult::factory(2)->create([
            'user_id' => $etudiant->id,
            'hsk_test_id' => $tests->first()->id, 
        ]);

        // 7. CORRECTION ICI : Création d'une progression sur UN cours
        // On ne boucle plus sur les leçons car la progression est liée au Course.
        Progression::factory()->create([
            'user_id' => $etudiant->id,
            'course_id' => $courses->first()->id, // Liaison au premier cours créé
            'status' => 'EN_COURS',
            'percentage' => 35.5,
        ]);

        // 8. Création de posts sur le forum
        ForumPost::factory(10)
            ->for($etudiant) 
            ->has(Comment::factory()->count(3))
            ->create();
    }
}