<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DominionCardSet extends Model
{
    use HasFactory;

    protected $table = 'dominion_card_sets';
    protected $primaryKey = 'dominion_card_set_id';
    public $timestamps = false;
    public string $title;
    public string $author;

    protected $attributes = [
        'title' => '',
        'author' => 'Unknown'
    ];

    protected $fillable = ['title', 'author'];

    public function cards(): HasMany
    {
        return $this->hasMany(DominionCard::class);
    }
}
