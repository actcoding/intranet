<?php

namespace App\Services;

use App\Contracts\JwtSubject;
use App\Models\User;
use Carbon\Carbon;
use Carbon\WrapperClock;
use Closure;
use DateTimeImmutable;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Traits\Macroable;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\Builder;
use Lcobucci\JWT\UnencryptedToken;
use Lcobucci\JWT\Validation\Constraint;
use Lcobucci\JWT\Validation\Constraint\PermittedFor;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Constraint\StrictValidAt;

class JwtGuard implements Guard
{
    use GuardHelpers,
        Macroable;

    private const CACHE_KEY = 'jwt_blacklist_';

    public const AUDIENCE_ACCESS = 'access_token';

    public const AUDIENCE_REFRESH = 'refresh_token';

    protected Key $key;

    public function __construct(
        UserProvider $provider,
        protected Repository $config,
        protected JwtFacade $jwt,
        protected Signer $signer,
        protected Request $request,
    ) {
        $this->setProvider($provider);

        $this->key = InMemory::plainText($this->config->get('jwt.key'));
    }

    /**
     * Get the current request instance.
     */
    public function getRequest(): Request
    {
        return $this->request ?: Request::createFromGlobals();
    }

    /**
     * Set the current request instance.
     */
    public function setRequest(Request $request): self
    {
        $this->request = $request;

        return $this;
    }

    public function user(): ?Authenticatable
    {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (! is_null($this->user)) {
            return $this->user;
        }

        try {
            $token = $this->getTokenFromRequest();

            return $this->user = $this->retrieveUser($token);
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * Attempt to authenticate a user using the given credentials.
     */
    public function attempt(array $credentials = []): array|bool
    {
        $user = $this->provider->retrieveByCredentials($credentials);

        if ($user == null || ! $this->provider->validateCredentials($user, $credentials)) {
            return false;
        }

        $this->setUser($user);

        return $this->issue();
    }

    public function refresh(): array
    {
        $refreshToken = $this->validateToken(
            $this->request->input(self::AUDIENCE_REFRESH),
            new PermittedFor(self::AUDIENCE_REFRESH),
        );

        $newTokens = $this->issue();

        $this->invalidate($refreshToken);

        return $newTokens;
    }

    public function validate(array $credentials = []): bool
    {
        return is_array($this->attempt($credentials));
    }

    /**
     * Invalidates a token by adding it to the blacklist. It cannot be used afterwards.
     */
    public function invalidate(string|UnencryptedToken|null $token = null): void
    {
        if ($token === null)
        {
            $token = $this->getTokenFromRequest();
        }

        $this->blacklist($token);
    }

    private function retrieveUser(string|UnencryptedToken $token): ?Authenticatable
    {
        if (is_string($token)) {
            $token = $this->validateToken($token);
        }

        return $this->provider->retrieveById($token->claims()->get('sub'));
    }

    private function validateToken(string|null $token, Constraint ...$constraints): UnencryptedToken
    {
        if ($token === null) {
            abort(401, 'Unauthenticated.');
        }

        $token = $this->jwt->parse(
            $token,
            new SignedWith($this->signer, $this->key),
            new StrictValidAt(new WrapperClock(Carbon::now())),
            ...$constraints,
        );

        if ($this->isBlacklisted($token)) {
            abort(401, 'Unauthenticated.');
        }

        $userId = $token->claims()->get('sub');
        $this->user = User::whereId($userId)->firstOrFail();

        return $token;
    }

    private function getTokenFromRequest(): UnencryptedToken
    {
        return $this->validateToken(
            $this->request->bearerToken(),
            new PermittedFor(self::AUDIENCE_ACCESS),
        );
    }

    private function isBlacklisted(string|UnencryptedToken $token): bool
    {
        if (is_string($token)) {
            $token = $this->validateToken($token);
        }

        $jti = $token->claims()->get('jti');

        return Cache::has(self::CACHE_KEY . $jti);
    }

    private function blacklist(string|UnencryptedToken $token): void
    {
        if (is_string($token)) {
            $token = $this->validateToken($token);
        }

        $jti = $token->claims()->get('jti');

        Cache::put(
            self::CACHE_KEY . $jti,
            'blacklisted',
            config('jwt.ttl.blacklist'),
        );
    }

    private function issue(): array
    {
        $claims = [];
        if (class_implements($this->user(), JwtSubject::class)) {
            $claims = $this->user()->getClaims();
        }

        $access_token = $this->make(
            self::AUDIENCE_ACCESS,
            $claims,
            function (Builder $builder, DateTimeImmutable $now) {
                return $builder->expiresAt($now->modify('+' . config('jwt.ttl.' . self::AUDIENCE_ACCESS)));
            }
        )->toString();
        $refresh_token = $this->make(
            self::AUDIENCE_REFRESH,
            customiseBuilder: function (Builder $builder, DateTimeImmutable $now) {
                return $builder->expiresAt($now->modify('+' . config('jwt.ttl.' . self::AUDIENCE_REFRESH)));
            }
        )->toString();

        return [$access_token, $refresh_token];
    }

    private function make(string $aud, array $claims = [], ?Closure $customiseBuilder = null): UnencryptedToken
    {
        return $this->jwt->issue(
            $this->signer,
            $this->key,
            function (Builder $builder, DateTimeImmutable $now) use ($aud, $claims, $customiseBuilder) {
                $builder = $builder
                    ->issuedBy($this->config->get('app.url'))
                    ->permittedFor($aud)
                    ->relatedTo($this->id())
                    ->identifiedBy(Str::random(32));

                foreach ($claims as $name => $value) {
                    $builder = $builder->withClaim($name, $value);
                }

                if ($customiseBuilder != null) {
                    return $customiseBuilder($builder, $now);
                }

                return $builder;
            },
        );
    }
}
