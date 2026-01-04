<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HskTestController;
use App\Http\Controllers\ProfileController;
Route::post('/register', [AuthController::class, 'register']); // Inscription
Route::post('/login', [AuthController::class, 'login']);       // Connexion

Route::get('/courses', [CourseController::class, 'index']);    // Liste des cours
Route::get('/hsk-tests', [HskTestController::class, 'index']); // Liste des tests
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [ProfileController::class, 'show']);     // Voir mon profil
    Route::post('/user/update', [ProfileController::class, 'update']); // Modifier mon profil
    Route::get('/courses/{id}', [CourseController::class, 'show']); // Détail d'un cours
    Route::get('/courses/{course}/lessons/{lesson}', [CourseController::class, 'showLesson']); 
    Route::post('/lessons/{lesson}/complete', [CourseController::class, 'completeLesson']);
    Route::get('/hsk-tests/{id}', [HskTestController::class, 'show']); // Voir un test (questions)
    Route::post('/hsk-tests/{hskTest}/submit', [HskTestController::class, 'submit']); // Envoyer réponses
});