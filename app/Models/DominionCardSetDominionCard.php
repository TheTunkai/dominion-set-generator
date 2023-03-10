<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DominionCardSetDominionCard extends Model
{
    use HasFactory;

    public function dominionCard(): BelongsTo
    {
        return $this->belongsTo(DominionCard::class);
    }

    public function dominionCardSet(): BelongsTo
    {
        return $this->belongsTo(DominionCardSet::class);
    }
}
