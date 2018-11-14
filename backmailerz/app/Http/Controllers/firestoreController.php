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

        $users = DB::select('select * from users');
        $batches = DB::select('select * from batch');
        $letters = DB::select('select * from letters');
    
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
                                        'location' => $batch->location,                                        
                                        'phoneNumber' => "00000000000000",                                        
                                        'receivedBy' => "owner",
                                        'receiver' => "check PoBox",
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