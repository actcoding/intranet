<?php

namespace App\Console\Commands;

use Exception;
use Google\Cloud\Translate\V2\TranslateClient;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

use function Laravel\Prompts\confirm;

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
                            {--force : Force the operation to run}';

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

    public function __construct()
    {
        parent::__construct();

        $this->skip = collect([
            'validation.custom.attribute-name.rule-name',
        ]);
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $files = array_diff(scandir(lang_path('en')), ['..', '.']);
        $targetLanguage = $this->argument('language');

        /** @var Collection<string, string> */
        $data = collect($files)
            ->mapWithKeys(fn (string $file) => [basename($file, '.php') => require lang_path('en/' . $file)])
            ->dot()
            ->filter(fn (mixed $value) => is_string($value))
            ->filter(fn (string $value, string $key) => $this->skip->doesntContain($key));

        $chunk = 128;
        $count = $data->count();
        $apiCalls = ceil($count / $chunk);

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

                return;
            }
        }

        /** @var Collection<string, string> */
        $translated = $data
            ->chunk($chunk)
            ->map(fn (Collection $value) => $this->translate($value->values()))
            ->flatten(1)
            ->map(fn (array $result) => $result['text'])
            ->keyBy(fn (string $item, int $key) => $data->keys()[$key])
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

    /**
     * @param Collection<int, string>
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
