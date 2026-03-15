<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/ping', function() {
    $data = ["status" => "success", "message" => "rochdi"];
    return response(json_encode($data), 200)
          ->header('Content-Type', 'text/plain'); // Tunnel won't block 'text/plain'
});