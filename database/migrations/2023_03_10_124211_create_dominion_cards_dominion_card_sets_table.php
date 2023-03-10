<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dominion_cards_dominion_card_sets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dominion_card_id');
            $table->foreignId('dominion_card_set_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dominion_cards_dominion_card_sets');
    }
};
