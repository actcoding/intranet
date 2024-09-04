<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/storage/{path}', StorageController::class)
    ->where('path', '.*');

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

        Route::post('/reset-password', [AuthController::class, 'resetPassword'])
            ->name('auth.reset');
    });

Route::prefix('/user')
    ->middleware('auth:api')
    ->group(function () {
        Route::put('/profile', [UserController::class, 'updateProfile'])
            ->name('user.profile');
    });

Route::resource('/news', NewsController::class)
    ->except(['create', 'edit']);
Route::patch('/news/{news}/restore', [NewsController::class, 'restore'])
    ->name('news.restore')
    ->whereNumber('news');
Route::post('/news/{news}/upload', [NewsController::class, 'upload'])
    ->name('news.upload')
    ->whereNumber('news');
Route::get('/news/{news}/upload', [NewsController::class, 'listAttachments'])
    ->name('news.upload.list')
    ->whereNumber('news');
Route::delete('/news/{news}/upload/{attachment}', [NewsController::class, 'detach'])
    ->name('news.upload.delete')
    ->whereNumber('news')
    ->whereNumber('attachment');
