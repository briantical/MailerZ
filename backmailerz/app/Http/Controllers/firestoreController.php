<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Morrislaptop\Firestore\Factory;
use Kreait\Firebase\ServiceAccount;



class firestoreController extends Controller
{    
    
    public function setDocument()
    {        
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/authfile.json');
        $firestore = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->createFirestore();

            $collection = $firestore->collection('mailerz');
            $user = $collection->document('lutbrianivan@gmail.com');

            // Save a document
            $letter1 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0006",
                'location' => "Kyambogo",                                        
                'phoneNumber' => "00000000000000",                                        
                'receivedBy' => "owner",
                'receiver' => "Odongo Isaac",
                'receiverPoBox' =>"3212 Banda"
            );
            $letter2 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0007",
                'location' => "Kireka",                                        
                'phoneNumber' => "00000000000000",                                        
                'receivedBy' => "owner",
                'receiver' => "Ronnie Curtis",
                'receiverPoBox' =>"3245 Banda"
            );

            $batch1 = array(
                        'batchID' => 'b0006',
                        'isComplete' => false,
                        'totalLetters' => 5,
                        'location'=> 'Banda',
                        'letters' => array(
                            $letter1,
                            $letter2
                        )
                        );
           
            $letter3 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0008",
                'location' => "Kazo",                                        
                'phoneNumber' => "00000000000000",                                        
                'receivedBy' => "owner",
                'receiver' => "Odongo Ernest",
                'receiverPoBox' =>"3212 Mpigi"
            );
            
            $letter4 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0009",
                'location' => "Kamwenge",                                        
                'phoneNumber' => "00000000000000",                                        
                'receivedBy' => "owner",
                'receiver' => "Okello Curtis",
                'receiverPoBox' =>"3245 Mpigi"
            );

            $batch2 =array(
                'batchID' => 'b0005',
                'isComplete' => false,
                'totalLetters' => 30,
                'location'=> 'Mpigi',
                'letters' => array(
                    $letter3,
                    $letter4
                )
                );

            
            $user->set([
                'userName' => 'Lutaaya Brian Ivan',
                'userEmail' => 'lutbrianivan@gmail.com',
                'userPhoneNumber' => '+256789566944',
                'userPassword' => '1234567',
                'userAddress' => 'Kikoni',                
                'userRoleID' => 'r0001',
                'userID' => 'u0001',
                'branchID' => 'br001',
                'userImage' => 'none',
                'batches' => array(
                   "nothing"
                )                
                ]);
            echo '<h1>Firestore data is set</h1>';
            // Get a document
           // $snap = $user->snapshot();
            //echo $snap['name']; // morrislaptop
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