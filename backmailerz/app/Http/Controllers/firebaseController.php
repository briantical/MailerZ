<?php

namespace App\Http\Controllers;

require 'C:\Users\LUTAAYA BRIAN IVAN\BrianExternal\Bitwire\backmailerz\vendor/autoload.php';

use Kreait\Firebase;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Factory;
use Illuminate\Http\Request;

class firebaseController extends Controller
{
    public function index(){
    	$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/mailerz-f32b2-firebase-adminsdk-xaapa-a0c81c9f6d.json');
		$firebase = (new Factory)
    		->withServiceAccount($serviceAccount)
    		->create();

    		$database = $firebase->getDatabase();
    		$database->getReference('deliveries/batch')
			   ->set([
			       'mailer_name' => 'My Application',
			       'mailer_id' => 'My Application',
			       'mail_info' => [
			           'mail_sender' => 'support@domain.tld',
			           'mail_receiver' => 'sales@domain.tld',
			       ],
			       'isdelivered' => false,
			      ]);
			   echo '<h1>Firebase data is set</h1>';
    }
}
