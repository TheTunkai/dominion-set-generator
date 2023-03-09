<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowDominionCardsRequest;
use App\Http\Requests\StoreDominionCardRequest;
use Illuminate\Http\Request;
use App\Models\DominionCard;
use Inertia\Inertia;


class DominionCardController extends Controller
{
    public function store(StoreDominionCardRequest $request): \Illuminate\Http\RedirectResponse {
        $card = DominionCard::create([
            'name' => $request->name,
            'cost' => $request->cost,
            'effects' => $request->effects,
            'types' => $request->types,
            'image' => $request->image
        ]);

        return to_route('database');
    }

    public function show(ShowDominionCardsRequest $request) {
        $cards = DominionCard::databaseSearch($request);

        return Inertia::render('Database', [
            'cards' => $cards
        ]);
    }
}
