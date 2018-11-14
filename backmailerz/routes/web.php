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
Route::view('/Home2','home');
Route::post('/Home',"loginController@show");
Route::post('/Home2', "entriesController@createLetters");
Route::post('/Entries', "entriesController@createBatch");
Route::get('/Upload', "firestoreController@setDocument");

Route::resource('admin','DashboardController');