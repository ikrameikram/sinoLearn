<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hello', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Hello World! Laravel (8000) et React (5173) communiquent 🎉'
    ]);
});