<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Progression;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::withCount('lessons')->get();
        return response()->json($courses);
    }

    public function show($id)
    {
        $course = Course::with(['lessons', 'progressions' => function($query) {
            $query->where('user_id', Auth::id());
        }])->find($id);

        if (!$course) {
            return response()->json(['message' => 'Cours introuvable'], 404);
        }

        return response()->json($course);
    }

    public function showLesson(Course $course, Lesson $lesson)
    {
        if($lesson->course_id !== $course->id) {
            return response()->json(['message' => 'Leçon ne correspond pas au cours'], 404);
        }
        $lesson->load(['resources', 'exercises']);
        return response()->json($lesson);
    }
    
    public function completeLesson(Lesson $lesson)
    {
        $user = Auth::user();
        return response()->json([
            'message' => 'Leçon terminée avec succès !',
            'lesson_id' => $lesson->id
        ]);
    }
}