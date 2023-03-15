<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowDominionCardSetsRequest;
use App\Http\Requests\StoreDominionCardSetRequest;
use App\Http\Requests\GenerateCardSetRequest;
use App\Models\DominionCard;
use App\Models\DominionCardSet;
use Inertia\Inertia;

class DominionCardSetController extends Controller
{
    public function show(ShowDominionCardSetsRequest $request)
    {
        $cardSets = DominionCardSet::databaseSearch($request);

        return Inertia::render('Library', [
            'cardSets' => $cardSets,
            'allCards' => DominionCard::all()
        ]);
    }

    public function store(StoreDominionCardSetRequest $request)
    {
        $cardSet = DominionCardSet::create([
            'title' => $request->title,
            'author' => $request->author
        ]);

        $cardNames = json_decode($request->playedCards);


        foreach ($cardNames as $cardName) {
            $currentCard = DominionCard::firstWhere('name', $cardName);
            $cardSet->cards()->attach($currentCard->id);
        }

        return to_route("library");
    }

    public function generate(GenerateCardSetRequest $request)
    {
        $cardNames = json_decode($request->cards);
        $cardsToAdd = 10 - count($cardNames);
        $cards = DominionCard::all();
        $cardSet = [];

        foreach ($cardNames as $cardName) {
            array_push($cardSet, DominionCard::firstWhere('name', $cardName));
        }

        for ($i = 0; $i < $cardsToAdd; $i++) {
            $randomCard = $cards->random();
            array_push($cardSet, $randomCard);
            $cards->forget($randomCard->id);
        }

        return Inertia::render(
            'SetGenerator',
            [
                'cardSet' => $cardSet,
                'allCards' => DominionCard::all()
            ]
        );
    }
}
