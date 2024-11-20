<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [RegisterController::class, 'logout']);
    Route::apiResource('products', ProductController::class);
});

Route::post('/register',[App\Http\Controllers\Api\RegisterController::class, 'registerUser'])->name('register');
Route::post('/login', [App\Http\Controllers\Api\RegisterController::class, 'login']);
