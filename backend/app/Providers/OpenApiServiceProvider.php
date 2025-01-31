<?php

namespace App\Providers;

use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\Operation;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Dedoc\Scramble\Support\PhpDoc;
use Dedoc\Scramble\Support\RouteInfo;
use Illuminate\Routing\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use PHPStan\PhpDocParser\Ast\PhpDoc\PhpDocNode;

class OpenApiServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Scramble::routes(function (Route $route) {
            return true;
        });

        // @tags annotation in Controllers has priority
        // use it OR the controller name, not both
        Scramble::resolveTagsUsing(function (RouteInfo $routeInfo, Operation $operation) {
            $controller = Str::of(class_basename($routeInfo->className()))->replace('Controller', '');

            $classPhpDoc = $routeInfo->reflectionMethod()
                ? $routeInfo->reflectionMethod()->getDeclaringClass()->getDocComment()
                : false;

            $classPhpDoc = $classPhpDoc ? PhpDoc::parse($classPhpDoc) : new PhpDocNode([]);

            if (! count($tagNodes = $classPhpDoc->getTagsByName('@tags'))) {
                return [$controller];
            }

            return explode(',', array_values($tagNodes)[0]->value->value);
        });

        Scramble::afterOpenApiGenerated(function (OpenApi $openApi) {
            $openApi->secure(
                SecurityScheme::http('bearer', 'JWT'),
            );
        });
    }
}
