<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class entriesController extends Controller
{
    public function createBatch(Request $request)
    {    
        $batches = $request->input('totalLetters');
        
        $batchID = $request->input('batchID'); 
        $userID = $request->input('userID');
        $totalLetters = $request->input('totalLetters'); 
        $isComplete = $request->input('isComplete');
        $location = $request->input('location');

        $success = DB::insert('insert into batch (batchID, userID, totalLetters, isComplete, location) values (?,?,?,?,?)', [$batchID, $userID,$totalLetters,$isComplete,$location]);

        if($success){
            return view('batch', ['batchID'=>$batchID,'entries'=> $totalLetters, 'userID'=>$userID]);
        }    	   	
    }

    public function createLetters(Request $request)
    {            
        $letters = $request->post();
        $letter = array_slice($letters, 1,9);        
        
        for ($x = 0; $x < 1 ; $x++){
            for ($y = 0; $y <(sizeof($letter['letterID'])) ; $y++){
                $letterID = $letter['letterID'][$y];      
                $senderPoBox = $letter['senderPoBox'][$y];
                $receiverPoBox = $letter['receiverPoBox'][$y];  
                $isDelivered = $letter['isDelivered'][$y];
                $pickupDate = $letter['pickupDate'][$y];
                $pickupTime = $letter['pickupTime'][$y];
                $userID = $letter['userID'][$y];
                $batchID = $letter['batchID'][$y];
                

                $success = DB::insert('insert into letters (letterID, senderPoBox,receiverPoBox,isDelivered,pickupDate,pickupTime,userID,batchID) values (?,?,?,?,?,?,?,?)', [$letterID, $senderPoBox,$receiverPoBox,0,$pickupDate,$pickupTime, $userID, $batchID]);
                
                if($success){
                    return view('batch2');
                }

            }
    }
    }
}
