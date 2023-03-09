<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DominionCardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\DominionCard;
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
    return Inertia::render('Database', ['cards' => DominionCard::all()]);
})->name('database');

Route::get('/database/index', [DominionCardController::class, 'index'])->name('index');
Route::get('/database/search-cards', [DominionCardController::class, 'show'])->name('search-cards');

Route::post('/database/add-card', [DominionCardController::class, 'store'])->name('add-card');

require __DIR__ . '/auth.php';
