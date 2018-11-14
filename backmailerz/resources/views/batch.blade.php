<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Batch</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="flex-center position-ref full-height">            
            <div class="content">                
                <div>                   
                    <table>
                        <form action="{{ URL::to('/Home2') }}" method="post">
                            @csrf 
                            <tr>
                                <td>Letter ID</td>
                                <td>Sender PoBox</td>
                                <td>Receiver PoBox</td>
                                <td>isDelivered</td>
                                <td>Receiver</td>                                
                                <td>Pickup Date</td>
                                <td>Pickup Time</td>
                                <td>MailMan</td>
                            </tr>
                            @for ($x = 0; $x < $entries ; $x++)
                            <tr>
                                <td>
                                    <input type="text" name="letterID[]" placeholder="LetterID...">
                                </td>
                                <td>
                                    <input type="text" name="senderPoBox[]" placeholder="Sender POBOX...">
                                </td>
                                <td>
                                    <input type="text" name="receiverPoBox[]" placeholder="Receiver POBOX">
                                </td>
                                <td>
                                    <select name="isDelivered[]" >
                                        <option value="">false</option>
                                        <option value="">true</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" name="receiver[]" placeholder="Receiver">
                                </td>
                                <td>
                                    <input type="date" name="pickupDate[]" placeholder="dd/mm/yyyy">
                                </td> 
                                <td>
                                    <input type="text" name="pickupTime[]" placeholder="00:00">
                                </td>                                
                                <td>
                                    <input type="hidden" name="batchID[]" value={{$batchID}}>
                                </td>
                                <td>
                                    <input type="hidden" name="userID[]" value={{$userID}}>
                                </td>                                 
                            </tr>
                            @endfor                                                                                                          
                            <tr>
                                <td>
                                <input type="submit" name="submit" placeholder="SUBMIT">
                                </td>
                            </tr>
                        </form>
                    </table>
                </div>                                        
            </div>
        </div>
    </body>
</html>
