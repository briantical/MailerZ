<?php

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

//Route::get('/', function () {
   // return view('welcome');
//});
Route::view('/','welcome');
Route::post('/Home', "loginController@show");
Route::post('/Entries', "entriesController@show");
Route::get('/Upload', "firestoreController@setDocument");

Route::resource('admin','DashboardController');