<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\Menu\DishController;
use App\Http\Controllers\Menu\IngredientController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\Menu\PlanController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PhpinfoController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/phpinfo', PhpinfoController::class);

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

Route::get('/news/search', [NewsController::class, 'search']);
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

Route::resource('/event', EventController::class)
    ->except(['create', 'edit']);
Route::patch('/event/{event}/restore', [EventController::class, 'restore'])
    ->name('event.restore')
    ->whereNumber('event');
Route::post('/event/{event}/upload', [EventController::class, 'upload'])
    ->name('event.upload')
    ->whereNumber('event');
Route::get('/event/{event}/upload', [EventController::class, 'listAttachments'])
    ->name('event.upload.list')
    ->whereNumber('event');
Route::delete('/event/{event}/upload/{attachment}', [EventController::class, 'detach'])
    ->name('event.upload.delete')
    ->whereNumber('event')
    ->whereNumber('attachment');

Route::prefix('/menu')
    ->group(function () {
        Route::apiResources([
            '/ingredient' => IngredientController::class,
            '/dish' => DishController::class,
            '/menu' => MenuController::class,
        ], [
            'middleware' => 'auth:api',
        ]);

        Route::get('/plan', [PlanController::class, 'list']);
        Route::post('/serve', [PlanController::class, 'serve']);
        Route::delete('/unserve', [PlanController::class, 'unserve']);
    });

Route::prefix('/link')
    ->middleware('auth:api')
    ->group(function () {
        Route::post('/attach', [LinkController::class, 'attach']);
        Route::delete('/detach/{news}/{event}', [LinkController::class, 'detach'])
            ->whereNumber(['news', 'event']);
    });
