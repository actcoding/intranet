<?php

namespace App\Traits;

use Carbon\Carbon;
use Laravel\Scout\Searchable as LaravelSearchable;

/**
 * An upgrade of the Searchable trait from Laravel Scout tuned for usage with the TypeSense search engine.
 *
 * It automatically handles the model-to-searchable conversions and does the following transformations:
 * - Timestamps are converted to unix time
 * - The model ID is converted into a string
 */
trait Searchable
{
    use LaravelSearchable;

    public function toSearchableArray(): array
    {
        $array = collect($this->toArray())
            ->map(function (mixed $value) {
                if ($value instanceof Carbon) {
                    return $value->timestamp;
                }

                return $value;
            })
            ->toArray();

        return array_merge($array, [
            'id' => (string) $array['id'],
        ]);
    }
}
