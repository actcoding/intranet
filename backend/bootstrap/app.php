<?php

use App\Http\Middleware\AccepLanguage;
use App\Http\Middleware\EnforceJsonResponse;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use Lcobucci\JWT\Encoding\CannotDecodeContent;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',

        apiPrefix: '',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(
            prepend: [
                EnforceJsonResponse::class,
            ],
            append: [
                HandleCors::class,
                AccepLanguage::class,
            ]
        );

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (CannotDecodeContent $e) {
            return response()->json([
                'error' => 'Invalid JWT token supplied!',
            ], 400);
        });
    })
    ->create();
