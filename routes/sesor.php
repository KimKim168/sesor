<?php

use App\Http\Controllers\SesorFrontPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SesorFrontPageController::class, 'index']);
Route::get('/about_us', [SesorFrontPageController::class, 'about']);
Route::get('/campaign_promotion', [SesorFrontPageController::class, 'campaign_promotion']);
Route::get('/service', [SesorFrontPageController::class, 'service']);


