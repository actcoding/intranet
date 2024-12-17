<?php

namespace App\Http\Controllers;

use App\Enum\UserStatus;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Handles authentication stuff.
 */
class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->invalidate();
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function resetPassword(PasswordResetRequest $request, Repository $repository)
    {
        $data = $request->validated();

        $user = auth()->user();

        $user->forceFill([
            'password' => Hash::make($data['password']),
            'status' => UserStatus::ACTIVE,
        ])->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));

        auth()->invalidate();
        auth()->logout();

        return response()->json(['message' => 'Password has been reset. You\'ve been logged out.']);
    }

    /**
     * Get the token array structure.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken(string $token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}
