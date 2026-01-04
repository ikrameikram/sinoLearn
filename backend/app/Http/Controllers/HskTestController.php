<?php

namespace App\Http\Controllers;

use App\Models\HskTest;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HskTestController extends Controller
{
    // Liste des tests disponibles
    public function index()
    {
        $tests = HskTest::orderBy('level')->get();
        return response()->json($tests);
    }

    // Lancer un test (récupérer les questions)
    public function show($id)
    {
        $hskTest = HskTest::with('questions.answers')->find($id);

        if (!$hskTest) {
            return response()->json(['message' => 'Test introuvable'], 404);
        }

        return response()->json($hskTest);
    }

    // Soumettre les réponses et calculer le score
    public function submit(Request $request, HskTest $hskTest)
    {
        // Format attendu du JSON venant de React : { "answers": { "question_id": "answer_id" } }
        $userAnswers = $request->input('answers', []); 

        $totalScore = 0;
        $listeningScore = 0;
        $readingScore = 0;
        
        // On récupère toutes les questions du test avec les VRAIES réponses
        $questions = $hskTest->questions()->with('answers')->get();
        $maxScore = $questions->sum('score');

        foreach ($questions as $question) {
            // L'ID de la réponse envoyée par l'étudiant
            $userAnswerId = $userAnswers[$question->id] ?? null;
            
            if ($userAnswerId) {
                // Vérifier si la réponse est correcte en base de données
                $correctAnswer = $question->answers->where('is_correct', true)->first();
                
                if ($correctAnswer && $correctAnswer->id == $userAnswerId) {
                    $totalScore += $question->score;
                    
                    // Répartition des points par catégorie
                    if ($question->type === 'ECOUTE') $listeningScore += $question->score;
                    if ($question->type === 'LECTURE') $readingScore += $question->score;
                }
            }
        }

        // Enregistrement du résultat
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