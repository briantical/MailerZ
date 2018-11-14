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
            <div class="firstPage">
                <Button onClick="window.location='{{ URL::to('/Upload') }}'">UPLOAD DATA</Button>
                <Button onClick="window.location='{{ URL::to('/Home') }}'">ADD DATA</Button>
            </div>
        </div>
    </body>
</html>
