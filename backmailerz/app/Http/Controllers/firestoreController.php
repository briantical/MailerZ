<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Morrislaptop\Firestore\Factory;
use Kreait\Firebase\ServiceAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;


class firestoreController extends Controller
{    
    
    public function setDocument()
    {        

        $users = DB::select('SELECT * FROM users WHERE `userRoleID` = ?', ['r0002']);
        $batches = DB::select('SELECT * FROM batch');
        $letters = DB::select('SELECT * FROM letters');
    
        foreach ($users as $index => $user) { 
            $fbatch= array();
            $fletter=array();

            $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/authfile.json');
            $firestore = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->createFirestore();

            $collection = $firestore->collection('mailerz');
            $fireUser = $collection->document($user->userEmail); 
            
            foreach ($batches as $index => $batch) {
                if(($batch->userID) == ($user->userID)){

                    foreach ($letters as $index => $letter) {
                        if(($letter->batchID) == ($batch->batchID)){
                            array_push($fletter,
                                    array(
                                        'dateReceived' =>"Today",
                                        'isDelivered' =>false,
                                        'letterID' => $letter->letterID,
                                        'location' => $letter->location,                                        
                                        'phoneNumber' => $letter->phoneNumber,                                        
                                        'receivedBy' => $letter->receivedBy,
                                        'receiver' =>(empty((DB::select("SELECT mailerName FROM `mailer` where `mailerPoBox`= ?", [$letter->receiverPoBox])))) ? "Unknown" : ((DB::select("SELECT mailerName FROM `mailer` where `mailerPoBox`= ?", [$letter->receiverPoBox]))[0]->mailerName),
                                        'receiverPoBox' =>$letter->receiverPoBox
                                    )
                                    ); 
                        }
                    }
                    array_push(
                        $fbatch,
                        array(
                            'batchID' => $batch->batchID,
                            'isComplete' => false,
                            'totalLetters' => $batch->totalLetters,
                            'location'=> $batch->location,
                            'letters' => $fletter
                        )
                        );                    
                }
            }

            $fireUser->set([
                'userName' => $user->userName ,
                'userEmail' => $user->userEmail,
                'userPhoneNumber' => $user->userPhoneNumber,
                'userPassword' => $user->userPassword,
                'userAddress' => $user->userAddress,                
                'userRoleID' => $user->userRoleID,
                'userID' => $user->userID,
                'branchID' => $user->branchID,
                'userImage' => "null",
                'batches' => $fbatch              
                ]);
        }
        if($fireUser){
            $deletedBatches = DB::delete('DELETE FROM batch');
            $deletedLetters = DB::delete('DELETE FROM letters');

            if($deletedBatches && $deletedLetters){
                return view('home', ['message'=>'Data has been successfully uploaded']);
            }
        }else{
            return view('home', ['message'=>'Failed Upload']);
        }
        
    }

    public function getDocument()
    {        
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/authfile.json');
        $firestore = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->createFirestore();

            $collection = $firestore->collection('users');
            $user = $collection->document('123456');
          
            // Get a document
            $snap = $user->snapshot();
            echo $snap['name']; // morrislaptop
    }
}