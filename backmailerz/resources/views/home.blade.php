<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Entries</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="flex-center position-ref full-height">            
            <div class="content">
            <div>
                
            </div>                
                <div>
                    <table>
                        <form action="{{ URL::to('/Entries') }}" method="post">
                            @csrf
                            <tr>
                                <td>Batch Id </td>
                                <td>isComplete</td>
                                <td>Total Batch Letters</td>
                                <td>Total Delivered</td>
                                <td>Delivery Area</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="batchID" placeholder="Batch...">
                                </td>
                                <td>
                                    <input type="text" name="isComplete" placeholder="false...">
                                </td>
                                <td>
                                    <input type="number" name="totalLetters" placeholder="30">
                                </td>
                                <td>
                                    <input type="number" name="totalDelivered" placeholder="0">
                                </td>
                                <td>
                                    <input type="text" name="location" placeholder="Somewhere">
                                </td> 
                                <td>
                                    <input type="text" name="userID" placeholder="u0001">
                                </td>                                
                            </tr>
                            <tr><td colspan="5"><input type="submit" name="submit"></td></tr>                            
                        </form>
                    </table>
                </div>                                        
            </div>
        </div>
    </body>
</html>
