<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Home</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="flex-center position-ref full-height">            
            <div class="content">                
                <div>
                    <table>
                        <form action="{{route('admin.store')}}" method="post">
                            @csrf
                            <tr>
                                <td>Batch Id </td>
                                <td>isDelivered</td>
                                <td>totalLetters</td>
                                <td>isComplete</td>
                                <td>location/Delivery Area</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="batchID" placeholder="Batch...">
                                </td>
                                <td>
                                    <input type="text" name="isComplete" placeholder="false...">
                                </td>
                                <td>
                                    <input type="text" name="tDelivered" placeholder="30">
                                </td>
                                <td>
                                    <input type="text" name="nDelivered" placeholder="0">
                                </td>
                                <td>
                                    <input type="text" name="location" placeholder="Somewhere">
                                </td>                                
                            </tr>
                            <tr>
                                <td>Letter ID</td>
                                <td>Sender PoBox</td>
                                <td>Receiver PoBox</td>
                                <td>isDelivered</td>
                                <td>Receiver</td>
                                <td>Received By</td>
                                <td>Picked up by</td>
                                <td>Receiver Phone Number</td>
                                <td>Date Received</td>
                            </tr>
                           
                            <tr>
                                <td>
                                    <input type="text" name="letterID" placeholder="LetterID...">
                                </td>
                                <td>
                                    <input type="text" name="senderPoBox" placeholder="Sender POBOX...">
                                </td>
                                <td>
                                    <input type="text" name="receiverPoBox" placeholder="Receiver POBOX">
                                </td>
                                <td>
                                    <select name="isDelivered" >
                                        <option value="">false</option>
                                        <option value="">true</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" name="receiver" placeholder="Receiver">
                                </td>
                                <td>
                                    <input type="text" name="receivedBy" placeholder="Received By">
                                </td> 
                                <td>
                                    <input type="text" name="pickupBy">
                                </td>
                                
                                <td>
                                    <input type="number" name="receiverPhone">
                                </td>   
                              
                                <td>
                                    <input type="date" name="receivedOn" placeholder="Date Received">
                                </td><br>
                                <td colspan="5"><br>
                                    <input type="submit" name="submit" placeholder="SUMBIT">
                                </td>
                            </tr>
                        </form>
                    </table>
                </div>                                        
            </div>
        </div>
    </body>
</html>
