<?php

namespace App\Providers;

use App\Services\JwtGuard;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Signer::class, function (Application $app) {
            return new Sha256;
        });

        $this->app->bind(JwtFacade::class, function (Application $app) {
            return new JwtFacade;
        });

        Auth::extend('jwt', function (Application $app, string $name, array $config) {
            $guard = new JwtGuard(
                $app['auth']->createUserProvider($config['provider']),
                $app->make(Repository::class),
                $app->make(JwtFacade::class),
                $app->make(Signer::class),
                $app->make(Request::class),
            );

            $app->refresh('request', $guard, 'setRequest');

            return $guard;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Authenticate::redirectUsing(fn () => route('auth.login'));

        Scramble::routes(function (Route $route) {
            return true;
        });

        Scramble::afterOpenApiGenerated(function (OpenApi $openApi) {
            $openApi->secure(
                SecurityScheme::http('bearer', 'JWT'),
            );
        });
    }
}
