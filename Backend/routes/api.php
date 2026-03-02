<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users', function (Request $request) {
    return User::select();
});
Route::post('/register', [AuthController::class,"register"]
);
Route::post('/login', [AuthController::class,"login"]
);
Route::post('/logout', [AuthController::class,"logout"]
);
Route::resource("annonces",AnnonceController::class);
Route::get('/users/{user}/annonces',[AnnonceController::class,"userAnnonces"]);
Route::get('/categories/{categorie}',[AnnonceController::class,"categorieAnnonces"]);