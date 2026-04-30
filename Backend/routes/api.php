<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EvaluationController;
use App\Models\Evaluation;
use App\Models\User;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    

Route::post('/logout', [AuthController::class,"logout"]);
Route::resource("evaluations", EvaluationController::class);
Route::get('/my-favoris', [FavoriController::class, 'index']);



});
Route::post('/login', [AuthController::class,"login"]);
Route::post('/register', [AuthController::class,"register"]
);
Route::resource("annonces",AnnonceController::class);

Route::get('/users/{user}/annonces',[AnnonceController::class,"userAnnonces"]);
Route::post('/favori/toggle',[FavoriController::class,'toggle']);
Route::post('/favori/check',[FavoriController::class,'check']);
Route::get('/data', [AnnonceController::class, 'data']);
Route::resource("users", UserController::class);