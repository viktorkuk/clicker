<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClickController;

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

/*Route::get('/', function () {
    return view('welcome');
});*/

//http://localhost:8080/click/?param1=some_value&param2=some_value

Route::get('/click/',
    [ClickController::class, 'recordClick']
)->name('record_click');

Route::get('/', function () {
    return view('clicks');
});

Route::get('/test/', function () {
    return view('click_success');
});

#/succes/ID_CLICK
#/error/ID_CLICK

Route::get('/success/{hash?}', function () {
    return view('click_success');
})->name('click_success');

Route::get('/error/{hash?}', function () {
    return view('click_error');
})->name('click_error');




