<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController; 
use App\Http\Controllers\HskTestController;
use App\Http\Controllers\ProfileController;

Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']);
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/hsk-tests', [HskTestController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/lessons', [LessonController::class, 'index']); 

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [ProfileController::class, 'show']);    
    Route::post('/user/update', [ProfileController::class, 'update']); 
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/{course}/lessons/{lesson}', [CourseController::class, 'showLesson']); 
    Route::post('/lessons/{lesson}/complete', [CourseController::class, 'completeLesson']);
    Route::get('/hsk-tests/{id}', [HskTestController::class, 'show']); 
    Route::post('/hsk-tests/{hskTest}/submit', [HskTestController::class, 'submit']);
});