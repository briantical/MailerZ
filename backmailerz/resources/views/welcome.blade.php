<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MailerZ</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

    <!-- Styles color: #636b6f; -->
    <style>
        html, body {               
                background-image: url('/images/letters.jpg');
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                width: 100%;
                color: #000;
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
            .mailerz{
                stroke: aliceblue;
                stroke-width: 1px;
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
              border-bottom: 2px solid #000;
              background: transparent;
            }

            input[type="password"] {
              width: 100%;
              padding: 12px 20px;
              margin: 8px 0;
              box-sizing: border-box;
              border: none;
              border-bottom: 2px solid #000;
              background: transparent;
            }

            input[type="text"]:focus {
              border: 1px solid #000;
            }
            
            .m-b-md {
                margin-bottom: 30px;
            }
            .labels{
                font-weight: bold;
            }
            .btn{
                border-width: 1px;
                border-color: #000;
                border-radius: 20px;
                height: 40px;
                width: 70px;
            }
        </style>
</head>

<body>
    <div class="flex-center position-ref full-height">
        <div class="content">
            <div class="title m-b-md">
                <p class="mailerz">MailerZ</p>
            </div>
            <div>
                <table>
                    <form action="{{ URL::to('/Home') }}" method="POST" autocomplete="off">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                        <tr>
                            <td class="labels">Email :</td>
                            <td><input type="text" name="email" placeholder="example@gmail.com" value="{{ old('email') }}"></td>
                        </tr>
                        <tr>
                            <td class="labels">Password:</td>
                            <td><input type="password" name="password" placeholder="password" value="{{ old('password') }}"></td>
                        </tr>
                        <tr>
                            <td colspan="2"><button class="btn" type="submit" name="signin_btn">SIGN IN</button></td>
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
