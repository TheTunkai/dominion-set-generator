<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DominionCard>
 */
class DominionCardFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->name(),
            'cost' => fake()->randomElement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
            'types' => fake()->randomElement(['["action"]', '["victory"]', '["curse"]']),
            'effects' => fake()->randomElement(['["actions"]', '["cards"]', '["buys"]', '["coins"]', '["trash"]', '["gain"]', '["junk"]', '["victory"]'])
        ];
    }
}
