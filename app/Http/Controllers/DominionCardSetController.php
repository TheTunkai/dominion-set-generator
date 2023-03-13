<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowDominionCardSetsRequest;
use App\Http\Requests\StoreDominionCardSetRequest;
use App\Models\DominionCard;
use App\Models\DominionCardSet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DominionCardSetController extends Controller {
    public function show(ShowDominionCardSetsRequest $request) {
        $cardSets = DominionCardSet::databaseSearch($request);

        return Inertia::render('Library', [
            'cardSets' => $cardSets
        ]);
    }

    public function store(StoreDominionCardSetRequest $request) {
        $cardSet = DominionCardSet::create([
            'title' => $request->title,
            'author' => $request->author
        ]);

        $cardNames = json_decode($request->playedCards);


        foreach ($cardNames as $cardName) {
            $currentCard = DominionCard::firstWhere('name', $cardName);
            $cardSet->cards()->attach($currentCard->id);
        }

        return to_route('library');
    }
}
