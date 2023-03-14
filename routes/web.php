<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DominionCardController;
use App\Http\Controllers\DominionCardSetController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\DominionCard;
use App\Models\DominionCardSet;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/database', function () {
    return Inertia::render(
        'Database',
        [
            'cards' => DominionCard::simplePaginate(10),
        ]
    );
})->name('database');

Route::get('/library', function () {
    return Inertia::render(
        'Library',
        [
            'cardSets' => DominionCardSet::with('cards')->simplePaginate(3),
            'allCards' => DominionCard::all()
        ]
    );
})->name('library');

Route::get('/generator', function () {
    return Inertia::render(
        'SetGenerator',
        [
            'allCards' => DominionCard::all()
        ]
    );
})->name('generator');

Route::get('/database/search-cards', [DominionCardController::class, 'show'])->name('search-cards');
Route::get('/library/search-cardsets', [DominionCardSetController::class, 'show'])->name('search-cardsets');

Route::post('/database/add-card', [DominionCardController::class, 'store'])->name('add-card');
Route::post('/library/add-card-set', [DominionCardSetController::class, 'store'])->name('add-card-set');

Route::delete('/database/delete-card', [DominionCardController::class, 'destroy'])->name('delete-card');

require __DIR__ . '/auth.php';
