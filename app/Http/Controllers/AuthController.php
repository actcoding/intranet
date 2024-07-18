<?php

namespace App\Http\Controllers;

use App\Enum\UserStatus;
use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\RefreshTokenRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Resources\UserResource;
use App\Services\JwtGuard;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;

/**
 * Handles authentication stuff.
 */
class AuthController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['login', 'refresh']),
        ];
    }

    /**
     * Get a Jwt via given credentials.
     *
     * @unauthenticated
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! $token = $this->auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Invalidate the token.
     *
     * Optionally send a `refresh_token` to invalidate it too.
     */
    public function logout(LogoutRequest $request): JsonResponse
    {
        $request->validated();

        $this->auth()->invalidate();
        if ($request->has(JwtGuard::AUDIENCE_REFRESH)) {
            $this->auth()->invalidate($request->input(JwtGuard::AUDIENCE_REFRESH));
        }

        return response()->json(['message' => 'Successfully logged out.']);
    }

    /**
     * Display the authenticated user.
     */
    public function whoami(): UserResource
    {
        /** @var User */
        $user = $this->auth()->user();

        return new UserResource($user);
    }

    /**
     * Refresh a token.
     *
     * @unauthenticated
     */
    public function refresh(RefreshTokenRequest $request): JsonResponse
    {
        $request->validated();

        return $this->respondWithToken($this->auth()->refresh());
    }

    /**
     * Reset the user password.
     */
    public function resetPassword(PasswordResetRequest $request, Repository $repository): JsonResponse
    {
        $data = $request->validated();

        /** @var User */
        $user = $this->auth()->user();

        $user->forceFill([
            'password' => Hash::make($data['password']),
            'status' => UserStatus::ACTIVE,
        ]);

        $user->save();

        event(new PasswordReset($user));

        $this->auth()->invalidate();

        return response()->json(['message' => 'Password has been reset. You\'ve been logged out.']);
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken(array $token): JsonResponse
    {
        [$access_token, $refresh_token] = $token;

        return response()->json([
            'access_token' => $access_token,
            'refresh_token' => $refresh_token,
            'token_type' => 'bearer',
        ]);
    }

    /**
     * @return JwtGuard
     */
    protected function auth()
    {
        return auth();
    }
}
