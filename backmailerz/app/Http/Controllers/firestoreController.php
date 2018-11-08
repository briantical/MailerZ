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
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/mailerz-f32b2-firebase-adminsdk-xaapa-a0c81c9f6d.json');
        $firestore = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->createFirestore();

            $collection = $firestore->collection('mailerz');
            $user = $collection->document('mailman');

            // Save a document
            $letter1 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0003",
                'location' => "UCU",                                        
                'phoneNumber' => "+2567676866",                                        
                'receivedBy' => "owner",
                'receiver' => "Odongo Isaac",
                'receiverPoBox' =>"3212 Mukono"
            );
            $letter2 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0004",
                'location' => "Namilyango",                                        
                'phoneNumber' => "+2567676866",                                        
                'receivedBy' => "owner",
                'receiver' => "Ronnie Curtis",
                'receiverPoBox' =>"3245 Mukono"
            );

            $batch1 = array(
                        'batchID' => 'b0004',
                        'isComplete' => false,
                        'totalLetters' => 10,
                        'location'=> 'Mukono',
                        'letters' => array(
                            json_encode($letter1, JSON_FORCE_OBJECT),
                            json_encode($letter2,  JSON_FORCE_OBJECT)
                        )
                        );
           
            $letter3 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0005",
                'location' => "Kabo",                                        
                'phoneNumber' => "+2567676866",                                        
                'receivedBy' => "owner",
                'receiver' => "Odongo Ernest",
                'receiverPoBox' =>"3212 Gulu"
            );
            
            $letter4 = array(
                'dateReceived' =>"Today",
                'isDelivered' =>false,
                'letterID' => "l0005",
                'location' => "Goa",                                        
                'phoneNumber' => "+2567676866",                                        
                'receivedBy' => "owner",
                'receiver' => "Okello Curtis",
                'receiverPoBox' =>"3245 Gulu"
            );

            $batch2 =array(
                'batchID' => 'b0005',
                'isComplete' => false,
                'totalLetters' => 30,
                'location'=> 'Gulu',
                'letters' => array(
                    json_encode($letter3, JSON_FORCE_OBJECT),
                    json_encode($letter4,  JSON_FORCE_OBJECT)
                )
                );

            
            $user->set([
                'userName' => 'Talemwa Emmanuel',
                'userEmail' => 'talemwaemmanuel@gmail.com',
                'userPhoneNumber' => '+256789566944',
                'userPassword' => '1234567',
                'userAddress' => 'Lumumba',                
                'userRoleID' => 'r0002',
                'userID' => 'u0002',
                'branchID' => 'br001',
                'batches' => array(
                    $batch1 , $batch2
                )                
                ]);
            echo '<h1>Firestore data is set</h1>';
            // Get a document
           // $snap = $user->snapshot();
            //echo $snap['name']; // morrislaptop
    }

    public function getDocument()
    {        
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/mailerz-f32b2-firebase-adminsdk-xaapa-a0c81c9f6d.json');
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