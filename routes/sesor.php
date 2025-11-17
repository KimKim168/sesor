<?php

use App\Http\Controllers\Admin\CareerSubmitController;
use App\Http\Controllers\Admin\InquiryLeadFormController;
use App\Http\Controllers\SesorFrontPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/inquiry-lead-form', [InquiryLeadFormController::class, 'store']);
Route::post('/career-submits', [CareerSubmitController::class, 'store']);

Route::get('/', [SesorFrontPageController::class, 'index']);
Route::get('/about_us', [SesorFrontPageController::class, 'about']);
Route::get('/campaign_promotion', [SesorFrontPageController::class, 'campaign_promotion']);
Route::get('/service', [SesorFrontPageController::class, 'service']);


