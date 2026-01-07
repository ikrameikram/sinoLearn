<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with('course')
                         ->orderBy('course_id') 
                         ->paginate(6); 

        return response()->json($lessons);
    }
}