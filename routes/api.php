<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')
    ->middleware('auth:api')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login'])
            ->name('auth.login')
            ->withoutMiddleware('auth:api');

        Route::post('/logout', [AuthController::class, 'logout'])
            ->name('auth.logout');

        Route::post('/refresh', [AuthController::class, 'refresh'])
            ->name('auth.refresh');
    });

Route::prefix('/user')
    ->middleware('auth:api')
    ->group(function () {
        Route::put('/profile', [UserController::class, 'updateProfile'])
            ->name('user.profile');
    });

Route::resource('/news', NewsController::class)
    ->middleware('auth:api')
    ->except(['create', 'edit']);
Route::patch('/news/{news}/restore', [NewsController::class, 'restore'])
    ->name('news.restore')
    ->middleware('auth:api')
    ->whereNumber('news');
