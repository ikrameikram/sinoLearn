<?php

namespace App\Http\Controllers;

use App\Models\HskTest;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HskTestController extends Controller
{
    public function index()
    {
        $tests = HskTest::orderBy('level')->get();
        return response()->json($tests);
    }
    public function show($id)
    {
        $hskTest = HskTest::with('questions.answers')->find($id);

        if (!$hskTest) {
            return response()->json(['message' => 'Test introuvable'], 404);
        }

        return response()->json($hskTest);
    }

    public function submit(Request $request, HskTest $hskTest)
    {
        $userAnswers = $request->input('answers', []); 
        $totalScore = 0;
        $listeningScore = 0;
        $readingScore = 0;
        $questions = $hskTest->questions()->with('answers')->get();
        $maxScore = $questions->sum('score');

        foreach ($questions as $question) {
            $userAnswerId = $userAnswers[$question->id] ?? null;
            if ($userAnswerId) {
                $correctAnswer = $question->answers->where('is_correct', true)->first();
                if ($correctAnswer && $correctAnswer->id == $userAnswerId) {
                    $totalScore += $question->score;
                    if ($question->type === 'ECOUTE') $listeningScore += $question->score;
                    if ($question->type === 'LECTURE') $readingScore += $question->score;
                }
            }
        }
        $result = TestResult::create([
            'user_id' => Auth::id(),
            'hsk_test_id' => $hskTest->id,
            'score' => $totalScore,
            'max_score' => $maxScore,
            'is_passed' => $totalScore >= $hskTest->min_score,
            'listening_score' => $listeningScore,
            'reading_score' => $readingScore,
            'status' => 'termine',
        ]);

        return response()->json([
            'message' => 'Test corrigé',
            'result' => $result
        ]);
    }
}