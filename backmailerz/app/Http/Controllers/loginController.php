<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

class loginController extends Controller
{
    public function show(Request $request)
    {    	
    	$results = DB::select("SELECT * FROM `users` where `userEmail`= ?", [$request->input('email')]);
    	$dbEmail = $results[0]->userEmail; 
    	$dbPassword = $results[0]->userPassword;

    	if(($request->input('email') == $dbEmail) && ($request->input('password') == $dbPassword)){    		
    		return view('home2');
    	}    	   	
	}

	public function display(Request $request)
    {    	    	  		
    	return view('home2');       	   	
	}
	
}
