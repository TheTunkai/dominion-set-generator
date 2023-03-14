<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DominionCardSet>
 */
class DominionCardSetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement(['Special Set', 'Awesome Set', 'Another Set', 'Wonderful Set', 'Unique Set', 'Redundant Set']),
            'author' => fake()->name()
        ];
    }
}
