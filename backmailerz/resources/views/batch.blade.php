<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Batch</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <style>
             .full-height {
                height: 100vh;
            }
         
            .corneredMailerz{
                color: #636b6f;
                position: absolute;
                top: 0px;
                right: 0px;
                font-weight: bold;
                font-size: 50px;
                padding-right: 50px;
                padding-top: 20px;
            }
            .tableDisplay{
                margin-top: 50px;
                margin-left: 40px;
            }
        </style>
    </head>
    <body>
        <div class="full-height">            
            <div class="corneredMailerz">
                MailerZ
            </div>             
                <div class="tableDisplay">
                    <table>
                        <form action="{{ URL::to('/Letters') }}" method="post" autocomplete="off">
                            @csrf
                            <tr>
                                <th>Batch Id </th>                        
                                <th>Total Batch Letters</th>                                
                                <th>Delivery Area</th>
                                <th>Mail man</th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="batchID" placeholder="b0000" value="{{ old('batchID') }}" maxlength="5">
                                </td>                                
                                <td>
                                    <input type="number" name="totalLetters" placeholder="30" value="{{ old('totalLetters') }}" maxlength="50">
                                </td>                                
                                <td>
                                    <input type="text" name="location" placeholder="Somewhere" value="{{ old('location') }}" maxlength="15"> 
                                </td> 
                                <td>                                    
                                    <select name="userID">
                                        <?php
                                            function selectCreator(){
                                                $users = \DB::select('SELECT * FROM `users` where `userRoleID` = ?', ['r0002']);
                                                return $users;
                                            }
                                            $userE = selectCreator();                                                                 
                                            foreach ($userE as $key => $user) {?>
                                             <option value="<?=($user->userID)?>"> <?=($user->userName)?> </option>
                                            <?php }
                                            
                                        ?>
                                    </select>                                  
                                </td> 
                                  <input type="hidden" name="totalDelivered" value=0>
                                  <input type="hidden" name="isComplete" value=0>                             
                            </tr>
                            <tr><td colspan="5" align="center"><input type="submit" name="submit"></td></tr>                            
                        </form>
                    </table>                    
                    @if(count($errors))
                        <div>
                            <div>
                                <ul>
                                    @foreach($errors->all() as $error)
                                        <li>{{$error}}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endif
                </div>                                        
            </div>
        </div>
    </body>
</html>
