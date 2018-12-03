<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Letters</title>
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
            .theHeaders{
                border-bottom-width: 1px;
            }
        </style>
    </head>
    <body>
        <div class="full-height">
            <div class="corneredMailerz">
                MailerZ
            </div>             
            <div class="tableDisplay">                
                <div>                   
                    <table cellspacing="10px">
                        <form action="{{ URL::to('/Batch') }}" method="post" autocomplete="off">
                            @csrf 
                            <tr class="theHeaders">
                                <th>Letter ID</th>
                                <th>Sender PoBox</th>
                                <th>Receiver PoBox</th>                                                                                               
                                <th>Pickup Date</th>
                                <th>Pickup Time</th>                                
                            </tr>
                            @for ($x = 0; $x < $entries ; $x++)
                            <tr>
                                <td>
                                    <input type="text" name="letterID[{{$x}}]" placeholder="LetterID..." value="{{ old('letterID['.$x.']') }}" maxlength="5" required>
                                </td>
                                <td>
                                    <input type="text" name="senderPoBox[{{$x}}]" placeholder="Sender POBOX..." value="{{ old('senderPoBox['.$x.']') }}" required maxlength="15">
                                </td>
                                <td>
                                    <input type="text" name="receiverPoBox[{{$x}}]" placeholder="Receiver POBOX" value="{{ old('receiverPoBox['.$x.']') }}" required required maxlength="15">
                                </td>                                                                
                                <td>
                                    <input type="date" name="pickupDate[{{$x}}]" placeholder="dd/mm/yyyy" value="{{ old('pickupDate['.$x.']') }}" required>
                                </td> 
                                <td>
                                    <input type="time" name="pickupTime[{{$x}}]" placeholder="00:00" value="{{ old('pickupTime['.$x.']') }}" maxlength="5" required>
                                </td>                                                                 
                                <td>
                                    <input type="hidden" name="batchID[{{$x}}]" value={{$batchID}}>
                                </td>
                                <td>
                                <input type="hidden" name="userID[{{$x}}]" value={{$userID}}>
                                </td>
                                <td>                                    
                                    <input type="hidden" name="isDelivered[{{$x}}]" value=0>
                                </td>                                 
                            </tr>
                            @endfor                                                                                                          
                            <tr>
                                <td colspan="6" align="center">
                                <input type="submit" name="submit" placeholder="SUBMIT">
                                </td>
                            </tr>
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
