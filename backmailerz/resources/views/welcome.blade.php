<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>MailerZ</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }
            
            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }
            td {
                justify-content: flex-start;
            }
            input[type="text"] {
              width: 100%;
              padding: 12px 20px;
              margin: 8px 0;
              box-sizing: border-box;
              border: none;
              border-bottom: 2px solid #555;
            }

            input[type="password"] {
              width: 100%;
              padding: 12px 20px;
              margin: 8px 0;
              box-sizing: border-box;
              border: none;
              border-bottom: 2px solid #555;
            }

            input[type="text"]:focus {
              border: 1px solid #555;
            }
            
            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title m-b-md">
                    MailerZ
                </div>
                <div class=>
                    <table>
                        <form action="{{ URL::to('/Home') }}" method="post">
                            <input type="hidden" name="_token" value="{{csrf_token()}}">                  
                            <tr>
                                <td>Email :</td>
                                <td><input type="text" name="email" placeholder="example@gmail.com"></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" name="password" placeholder="password"></td>
                            </tr>
                            <tr><td colspan="2"><button type="submit" name="signin_btn">SIGN IN</button></td></tr>
                        </form>
                    </table>
                </div>                                        
            </div>
        </div>
    </body>
</html>
