<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Translation\Exception\InvalidArgumentException;

class AccepLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $this->parseHttpLocale($request);

        try {
            app()->setLocale($locale);
        } catch (\Throwable $th) {
            // ignore invalid locale
            if (! ($th instanceof InvalidArgumentException)) {
                throw $th;
            } else {
                $locale = app()->getFallbackLocale();
                app()->setLocale($locale);
            }
        }

        /** @var \Symfony\Component\HttpFoundation\Response */
        $response = $next($request);

        // streamed content like images etc. do not need the language header
        if (! $response instanceof StreamedResponse) {
            $response->headers->set('Content-Language', $locale);
        }

        return $response;
    }

    /**
     * Laravel middleware for automatically setting application locale based on HTTP "Accept-Language" header
     *
     * @license MIT
     * @copyright Orkhan Ahmadov
     *
     * @see https://github.com/orkhanahmadov/laravel-accept-language-middleware
     */
    private function parseHttpLocale(Request $request): string
    {
        $list = explode(',', $request->server('HTTP_ACCEPT_LANGUAGE', ''));

        $locales = collect($list)
            ->map(function ($locale) {
                $parts = explode(';', $locale);
                $mapping = [];

                $mapping['locale'] = trim($parts[0]);

                if (isset($parts[1])) {
                    $factorParts = explode('=', $parts[1]);

                    $mapping['factor'] = $factorParts[1];
                } else {
                    $mapping['factor'] = 1;
                }

                return $mapping;
            })
            ->sortByDesc(function ($locale) {
                return $locale['factor'];
            });

        $result = $locales->first()['locale'];

        if (blank($result)) {
            return app()->getFallbackLocale();
        }

        return $result;
    }
}
