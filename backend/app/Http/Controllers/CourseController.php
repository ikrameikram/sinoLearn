<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Progression;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    // Liste des cours
    public function index()
    {
        // On renvoie les cours avec le nombre de leçons
        $courses = Course::withCount('lessons')->get();
        return response()->json($courses);
    }

    // Détail d'un cours
    public function show($id)
    {
        // On cherche le cours par son ID
        $course = Course::with(['lessons', 'progressions' => function($query) {
            // On charge la progression de l'utilisateur connecté seulement
            $query->where('user_id', Auth::id());
        }])->find($id);

        if (!$course) {
            return response()->json(['message' => 'Cours introuvable'], 404);
        }

        return response()->json($course);
    }

    // Détail d'une leçon
    public function showLesson(Course $course, Lesson $lesson)
    {
        // Vérification de cohérence
        if($lesson->course_id !== $course->id) {
            return response()->json(['message' => 'Leçon ne correspond pas au cours'], 404);
        }

        // On charge les ressources et exercices pour le frontend
        $lesson->load(['resources', 'exercises']);
        
        return response()->json($lesson);
    }
    
    // Marquer une leçon comme terminée
    public function completeLesson(Lesson $lesson)
    {
        $user = Auth::user();
        return response()->json([
            'message' => 'Leçon terminée avec succès !',
            'lesson_id' => $lesson->id
        ]);
    }
}