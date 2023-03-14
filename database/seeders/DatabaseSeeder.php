<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DominionCard;
use App\Models\DominionCardSet;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $cards = DominionCard::factory()->count(20)->create();
        $cardSets = DominionCardSet::factory()->count(6)->create();

        foreach ($cardSets as $cardSet) {
            for ($i = 0; $i < 10; $i++) {
                $cardSet->cards()->attach(fake()->randomElement($cards));
            }
        }
    }
}
