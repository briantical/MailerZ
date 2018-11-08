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
                        <form action="{{ URL::to('/Entries') }}" method="post">
                            <input type="hidden" name="_token" value="{{csrf_token()}}">
                            <tr>
                                <td>Mailer</td>
                                <td>Region</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Batch of</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="mailer_name" placeholder="Name...">
                                </td>
                                <td>
                                    <input type="text" name="pickup_region" placeholder="Location...">
                                </td>
                                <td>
                                    <input type="text" name="pickup_date" placeholder="01-01-2018">
                                </td>
                                <td>
                                    <input type="text" name="pickup_time" placeholder="14:00">
                                </td>
                                <td>
                                    <input type="text" name="number" placeholder="20">
                                </td>                                
                            </tr>
                            <tr>
                                <td colspan="5">
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
