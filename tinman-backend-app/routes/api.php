<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/threads', [ChatController::class, 'threads']);
    Route::post('/threads', [ChatController::class, 'createThread']);
    Route::get('/threads/{thread}/messages', [ChatController::class, 'messages']);
    Route::post('/threads/{thread}/messages', [ChatController::class, 'sendMessage']);
});
