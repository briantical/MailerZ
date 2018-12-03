<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

class loginController extends Controller
{	
	
    public function show(UserLoginRequest $request)
    {    
			
			$validated = $request->validated();

			$results = DB::select("SELECT * FROM `users` where `userEmail`= ?", [$request->input('email')]);
			
    	$dbEmail = (empty($results)) ? " " : $results[0]->userEmail ; 
    	$dbPassword = (empty($results))  ? " " : $results[0]->userPassword;

	
    	if((($request->input('email')) == $dbEmail) && (($request->input('password'))== $dbPassword)){    		
    		return view('home', ['message'=>'ENJOY']);
    	}    	   	
	}

	public function display(Request $request)
    {    	    	  		
    	return view('home', ['message'=>'ENJOY']);       	   	
	}
	
}
