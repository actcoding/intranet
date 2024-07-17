<?php

namespace App\Services;

use App\Contracts\JwtSubject;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use DateTimeImmutable;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\Builder;
use Lcobucci\JWT\UnencryptedToken;
use Lcobucci\JWT\Validation\Constraint;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Constraint\StrictValidAt;

class JwtGuard implements Guard
{
    use GuardHelpers;

    protected Key $key;

    public function __construct(
        UserProvider $provider,
        protected Repository $config,
        protected JwtFacade $jwt,
        protected Signer $signer,
    ) {
        $this->setProvider($provider);

        $this->key = InMemory::plainText($this->config->get('jwt.key'));
    }

    public function user(): ?Authenticatable
    {
        return $this->user;
    }

    /**
     * Attempt to authenticate a user using the given credentials.
     */
    public function attempt(array $credentials = []): array|bool
    {
        Log::info('creds', $credentials);

        $user = $this->provider->retrieveByCredentials($credentials);

        Log::info('creds', [$user]);

        if ($user == null) {
            return false;
        }

        $this->setUser($user);

        $claims = [];
        if (class_implements($user, JwtSubject::class)) {
            $claims = $user->getClaims();
        }

        $access_token = $this->make('access_token', $claims)->toString();
        $refresh_token = $this->make('refresh_token', customiseBuilder: function (Builder $builder, DateTimeImmutable $now) {
            return $builder->expiresAt($now->modify('+1 week'));
        })->toString();

        return [$access_token, $refresh_token];
    }

    public function validate(array $credentials = [])
    {
        return is_array($this->attempt($credentials));
    }

    public function invalidate(string $token)
    {
        $data = $this->validate($token);
        $jti = $data->claims()->get('jti');

        Cache::add('jwt_blacklist_' . $jti, 'blacklist', 60 * 60 * 24 * 7);
    }

    private function validateToken(string $token, Constraint ...$constraints): UnencryptedToken
    {
        $token = $this->jwt->parse(
            $token,
            new SignedWith($this->signer, $this->key),
            new StrictValidAt(Carbon::now()),
            $constraints,
        );

        $userId = $token->claims()->get('sub');
        $this->user = User::whereId($userId)->firstOrFail();

        return $token;
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
                    ->identifiedBy(Str::random());

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
