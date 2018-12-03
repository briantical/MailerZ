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
Route::view('/Batch','batch');
Route::post('/Home',"loginController@show");
Route::post('/Letters', "entriesController@createBatch");
Route::post('/Batch', "entriesController@createLetters");
Route::get('/Upload', "firestoreController@setDocument");
