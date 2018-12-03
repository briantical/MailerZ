<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\BatchRequest;
use App\Http\Requests\LetterRequest;

class entriesController extends Controller
{
    public function createBatch(BatchRequest $request)
    {   

        $validated = $request->validated();

        $batches = $request->input('totalLetters');
        
        $batchID = $request->input('batchID'); 
        $userID = $request->input('userID');
        $totalLetters = $request->input('totalLetters'); 
        $isComplete = $request->input('isComplete');
        $location = $request->input('location');

        $success = DB::insert('insert into batch (batchID, userID, totalLetters, isComplete, location) values (?,?,?,?,?)', [$batchID, $userID,$totalLetters,$isComplete,$location]);

        if($success){
            return view('letters', ['batchID'=>$batchID,'entries'=> $totalLetters, 'userID'=>$userID]);
        }    	   	
    }

    public function createLetters(Request $request)
    {    
        //$validated = $request->validated();

        $letters = $request->all();
        $letter = array_slice($letters, 1,9);  
        
        for ($y = 0; $y <(sizeof($letter['letterID'])) ; $y++){

            $results = DB::select("SELECT * FROM `mailer` where `mailerPoBox`= ?", [$letter['receiverPoBox'][$y]]);
            $receiverPhone = (empty($results)) ? "+2560000000" : $results[0]->mailerPhoneNumber ;
            $receiverAddress = (empty($results)) ? "No contact Address" : $results[0]->mailerAddress ;

            $letterID = $letter['letterID'][$y];      
            $senderPoBox = $letter['senderPoBox'][$y];
            $receiverPoBox = $letter['receiverPoBox'][$y];  
            $isDelivered = $letter['isDelivered'][$y];
            $pickupDate = $letter['pickupDate'][$y];
            $pickupTime = $letter['pickupTime'][$y];                
            $batchID = $letter['batchID'][$y];
            $location = $receiverAddress;
            $phoneNumber = $receiverPhone;
            $receivedBy = "owner";
            
            $success = DB::insert('insert into letters (letterID,batchID,receiverPoBox,isDelivered,pickupDate,pickupTime,senderPoBox,location,receivedBy,phoneNumber) values (?,?,?,?,?,?,?,?,?,?)', [$letterID,$batchID,$receiverPoBox,$isDelivered,$pickupDate,$pickupTime,$senderPoBox,$location,$receivedBy,$phoneNumber]);                
        }
        return view('home', ['message' => 'Entry successful!']);
         
    }
}
