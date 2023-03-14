<?php

namespace App\Models;

use App\Http\Requests\ShowDominionCardSetsRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DominionCardSet extends Model
{
    use HasFactory;

    protected $table = 'dominion_card_sets';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public string $title;
    public string $author;

    protected $attributes = [
        'title' => '',
        'author' => 'Unknown'
    ];

    protected $fillable = ['title', 'author'];

    public function cards(): BelongsToMany
    {
        return $this->belongsToMany(DominionCard::class, 'dominion_card_dominion_card_set', 'dominion_card_set_id', 'dominion_card_id');
    }

    public static function databaseSearch(ShowDominionCardSetsRequest $request)
    {
        return DominionCardSet::with('cards')
            ->withTitle($request->title != null ? $request->title : '')
            ->withCards($request->playedCards != null ? $request->playedCards : '')
            ->orderBy('title')
            ->simplePaginate(3);
    }

    public function scopeWithTitle(Builder $query, string $title = '')
    {
        $query->where('title', 'like', '%' . $title . '%');
    }

    public function scopeWithCards(Builder $query, string $cards = '')
    {
        $query->when($cards != '', function (Builder $query) use ($cards) {
            $query->whereHas('cards', function (Builder $query) use ($cards) {
                $query->whereIn('name', json_decode($cards));
            });
        });
    }
}
