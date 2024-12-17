<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Encryption\Encrypter;

class KeyGenerate extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:key-generate
                    {--show : Display the key instead of modifying files}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate application keys.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // APP_KEY
        $this->call('key:generate', ['--show' => $this->option('show')]);

        // JWT_KEY
        $key = bin2hex(Encrypter::generateKey($this->laravel['config']['app.cipher']));

        if ($this->option('show')) {
            return $this->line('<comment>' . ($key) . '</comment>');
        }

        if (! $this->setKeyInEnvironmentFile($key)) {
            return;
        }

        $this->laravel['config']['jwt.key'] = $key;

        $this->components->info('JWT key set successfully.');
    }

    protected function setKeyInEnvironmentFile($key)
    {
        $currentKey = $this->laravel['config']['jwt.key'];

        if (strlen($currentKey) !== 0 && (! $this->confirmToProceed())) {
            return false;
        }

        if (! $this->writeNewEnvironmentFileWith($key)) {
            return false;
        }

        return true;
    }

    protected function writeNewEnvironmentFileWith($key)
    {
        $replaced = preg_replace(
            $this->keyReplacementPattern(),
            'JWT_KEY=' . $key,
            $input = file_get_contents($this->laravel->environmentFilePath())
        );

        if ($replaced === $input || $replaced === null) {
            $this->error('Unable to set application key. No JWT_KEY variable was found in the .env file.');

            return false;
        }

        file_put_contents($this->laravel->environmentFilePath(), $replaced);

        return true;
    }

    protected function keyReplacementPattern()
    {
        $escaped = preg_quote('=' . $this->laravel['config']['jwt.key'], '/');

        return "/^JWT_KEY{$escaped}/m";
    }
}
