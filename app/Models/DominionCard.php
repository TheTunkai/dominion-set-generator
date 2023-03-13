<?php

namespace App\Models;

use App\Http\Requests\ShowDominionCardsRequest;
use http\Env\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DominionCard extends Model {
    use HasFactory;

    protected $table = 'dominion_cards';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public string $name;
    public int $cost;
    public string $image;
    public string $types;
    public string $effects;

    protected $attributes = [
        'name' => '',
        'cost' => 0,
        'types' => '',
        'effects' => '',
        'image' => '',
    ];

    protected $fillable = ['name', 'cost', 'effects', 'types', 'image'];

    public function cardSets(): BelongsToMany {
        return $this->belongsToMany(DominionCardSet::class, 'dominion_card_dominion_card_set', 'dominion_card_id', 'dominion_card_set_id');
    }

    public static function databaseSearch(ShowDominionCardsRequest $request) {
        return DominionCard::withName($request->name)
            ->withCost($request->cost)
            ->withEffects($request->effects)
            ->withTypes($request->types)
            ->orderBy('name')
            ->simplePaginate(10);
    }

    public function scopeWithName(Builder $query, string|null $name = '') {
        $query->where('name', 'like', '%' . $name . '%');
    }

    public function scopeWithCost(Builder $query, int|null $cost) {
        $query->when($cost != null, function (Builder $query) use ($cost) {
            $query->where('cost', '=', $cost);
        });
    }

    public function scopeWithEffects(Builder $query, string $effects) {
        $query->when($effects != '[]', function (Builder $query) use ($effects) {
            $query->where('effects', 'like', '%' . $effects . '%');
        });
    }

    public function scopeWithTypes(Builder $query, string $types) {
        $query->when($types != '[]', function (Builder $query) use ($types) {
            $query->where('effects', 'like', '%' . $types . '%');
        });
    }
}
