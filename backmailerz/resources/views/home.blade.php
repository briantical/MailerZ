<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Home</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <style>            
            .full-height {
                height: 100vh;
            }
            .flexer{
                align-items: center;
                justify-content: center;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
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
            .btn{
                padding: 10px;
                justify-content: center;
                align-items: center;
            }
        </style>               
    </head>
    <body>
        <div class="full-height">
            <div class="corneredMailerz">
                MailerZ
            </div>            
            <div class=" full-height flexer">
                <div class="full-height">
                    <div class=" flex-center">
                        <div class="btn">
                            <Button onClick="window.location='{{ URL::to('/Upload') }}'">UPLOAD DATA</Button>
                        </div>
                        <div class="btn">
                            <Button onClick="window.location='{{ URL::to('/Batch') }}'">ADD BATCH</Button> 
                        </div>
                    </div>
                    <div class="flex-center">
                        {{$message}}
                    </div>                
                </div>
            </div>            
        </div>
    </body>
</html>
