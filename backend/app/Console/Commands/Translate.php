<?php

namespace App\Console\Commands;

use Closure;
use Exception;
use Google\Cloud\Translate\V2\TranslateClient;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

use function Laravel\Prompts\confirm;

// TODO: Purge existing language

/**
 * Translates the base english language files to another language using the Google Cloud Translation API.
 */
class Translate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:translate
                            {language : The target language code. See <https://cloud.google.com/translate/docs/languages> for reference}
                            {--force : Force the operation to run}
                            {--ignore-existing : Ignore string that have already been translated.}
                            {--only= : Limit translation to a single component.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translates the base english language files to another language using the Google Cloud Translation API';

    /**
     * @var Collection<int, string>
     */
    protected $skip;

    /**
     * @var Collection<string, Closure>
     */
    protected $parts;

    protected int $chunkSize = 128;

    public function __construct()
    {
        parent::__construct();

        // TODO: Configure this somewhere else
        $this->skip = collect([
            // Backend
            'validation.custom.attribute-name.rule-name',

            // Frontend
            'Sidebar.creator-login',
        ]);

        $this->parts = collect([
            'backend' => fn () => $this->handleBackend(),
            'frontend' => fn () => $this->handleFrontend(),
        ]);
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $only = $this->option('only');

        if (is_string($only)) {
            $handler = $this->parts->get($only);

            if ($handler == null) {
                $this->error('Invalid component! Specify one of the following: ' . $this->parts->keys()->join(', '));
            } else {
                $this->info("Processing {$only} …");
                $handler();
            }
        } else {
            foreach ($this->parts as $part => $handler) {
                $this->info("Processing {$part} …");
                $handler();
            }
        }
    }

    private function handleBackend(): void
    {
        $files = array_diff(scandir(lang_path('en')), ['..', '.']);
        $targetLanguage = $this->argument('language');

        $existingKeys = collect();
        if (! $this->option('ignore-existing') && is_dir(lang_path($targetLanguage))) {
            $filesTarget = array_diff(scandir(lang_path($targetLanguage)), ['..', '.']);
            /** @var Collection<string, string> */
            $existingKeys = collect($filesTarget)
                ->mapWithKeys(fn (string $file) => [basename($file, '.php') => require lang_path($targetLanguage . '/' . $file)])
                ->dot()
                ->filter(fn (mixed $value) => is_string($value))
                ->filter(fn (string $value, string $key) => $this->skip->doesntContain($key));
        }

        /** @var Collection<string, string> */
        $data = collect($files)
            ->mapWithKeys(fn (string $file) => [basename($file, '.php') => require lang_path('en/' . $file)])
            ->dot()
            ->filter(fn (mixed $value) => is_string($value))
            ->filter(fn (string $value, string $key) => $this->skip->doesntContain($key))
            ->filter(fn (string $value, string $key) => ! $existingKeys->has($key));

        $count = $data->count();
        if ($count == 0) {
            $this->info('There is nothing to translate 🤌');

            return;
        }

        if (! $this->confirmTranslation($data)) {
            return;
        }

        /** @var Collection<string, string> */
        $translated = $data
            ->chunk($this->chunkSize)
            ->map(fn (Collection $value) => $this->translate($value->values()))
            ->flatten(1)
            ->map(fn (array $result) => $result['text'])
            ->keyBy(fn (string $item, int $key) => $data->keys()[$key])
            ->merge($existingKeys)
            ->undot();

        @mkdir(lang_path($targetLanguage, 0750));

        foreach ($translated as $file => $data) {
            $targetFile = lang_path($targetLanguage . '/' . $file . '.php');
            $dump = var_export($data, true);

            $contents = <<<EOL
            <?php

            return {$dump};
            EOL;

            file_put_contents($targetFile, $contents);
        }

        $this->info("Successfully translated {$count} strings.");
        $this->comment('Note that the content has been machine-translated. Make sure to manually review the translations.');
    }

    private function handleFrontend(): void
    {
        $targetLanguage = $this->argument('language');

        $data = collect(
            json_decode(file_get_contents(base_path('../frontend/messages/en.json')), true)
        )
            ->dot()
            ->filter(fn (string $value, string $key) => $this->skip->doesntContain($key));

        $count = $data->count();
        if ($count == 0) {
            $this->info('There is nothing to translate :)');

            return;
        }

        if (! $this->confirmTranslation($data)) {
            return;
        }

        /** @var Collection<string, string> */
        $translated = $data
            ->chunk($this->chunkSize)
            ->map(fn (Collection $value) => $this->translate($value->values()))
            ->flatten(1)
            ->map(fn (array $result) => $result['text'])
            ->keyBy(fn (string $item, int $key) => $data->keys()[$key])
            ->undot();

        $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;
        file_put_contents(base_path('../frontend/messages/' . $targetLanguage . '.json'), $translated->toJson($options));

        $this->info("Successfully translated {$count} strings.");
        $this->comment('Note that the content has been machine-translated. Make sure to manually review the translations.');
    }

    /**
     * @param  Collection<string, string>  $data
     */
    private function confirmTranslation(Collection $data): bool
    {
        $count = $data->count();
        $apiCalls = ceil($count / $this->chunkSize);

        if (! $this->option('force')) {
            $proceed = confirm(
                label: "Will process {$count} strings. Continue?",
                default: true,
                yes: 'Proceed',
                no: 'Cancel',
                hint: "Proceeding will make approx. {$apiCalls} API calls to the Google Cloud Translation API",
            );

            if (! $proceed) {
                $this->error('Operation canceled by user.');

                return false;
            }
        }

        return true;
    }

    /**
     * @param  Collection<int, string>  $messages
     */
    private function translate(Collection $messages): ?array
    {
        $key = config('services.google.translate.api_key');
        if (! $key) {
            throw new Exception('Api key is missing! Did you specify the environment variable "GOOGLE_TRANSLATE_API_KEY" ?');
        }

        $client = new TranslateClient([
            'key' => $key,
        ]);

        return $client->translateBatch($messages->toArray(), [
            'source' => 'en',
            'target' => $this->argument('language'),
            'format' => 'text',
        ]);
    }
}
