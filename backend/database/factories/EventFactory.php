<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Event>
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = now();

        return [
            'author_id' => 1,
            'starting_at' => $start,
            'ending_at' => $start->addDay(),
            'title' => $this->faker->sentence(5),
            'content' => '<p>' . $this->faker->sentence(50) . '</p>',
        ];
    }
}
