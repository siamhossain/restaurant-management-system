<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/css/report_page.style.css') }}">
{{--    <link rel="icon"--}}
{{--          href={{ \App\CDN\CDN::$PATHS['BUCKET_ROOT'] . '/' . \App\CDN\CDN::$PATHS['ROOT'] . @\App\Helpers\Helper::generalSettings()->fav_icon }} type="image/gif"--}}
{{--          sizes="16x16">--}}
    <link rel="stylesheet" href="{{ asset('assets/css/report_common.css') }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <style>
        table th, td {
            text-align: left !important;
        }
    </style>
</head>
<body>
{{--<style>
    style="display: flex; flex-direction: column; align-items: center; justify-content: center;color: white;"
</style>--}}





<page size="A4">


    <div class="header">
        <div class="row align-self-center">
            <table class="header_bar">
                <tr>
                    <td>
                        <div class="left-side">
                            <div class="logo">
                                @php
                                    $cdn = "https://edorpon-static.s3.ap-southeast-1.amazonaws.com/e-shop-v2/";

                                    $logo = $cdn . $store_info->logo_uri;
                                @endphp

                                @if(@$store_info != "" && @$store_info->logo_uri != "")
                                    <img src="{{$logo}}" alt="" style="width: 100px;"/>
                                @endif
                            </div>

                        </div>
                    </td>
                    <td>

                    </td>
                    <td>
                        <table class="info">
                            <tr>
                                <td style="border: none; line-height: 2; font-size: 12px; font-weight: 500;">
{{--                                    <span>{{@$data->phone_1}}</span></td>--}}
                                    @if(@$store_info != "")
                                        <span>{{$store_info->phone_1}}</span></td>
                                    @endif
                                <td style="border: none;width: 20px"><img style="margin-left: 8px" src="{{ asset('assets/images/phone.png') }}" alt=""></td>
                            </tr>
                            <tr>
                                <td style="border: none; line-height: 2; font-size: 12px; font-weight: 500;">
                                    @if(@$store_info != "")
                                        <span>{{$store_info->email}}</span></td>
                                    @endif
                                <td style="border: none;width: 20px"><img style="margin-left: 8px"
                                                                          src="{{ asset('assets/images/email.png') }}"
                                                                          alt=""></td>
                            </tr>
                            <tr>
                                <td style="border: none; line-height: 2; font-size: 12px; font-weight: 500;">
                                    @if(@$store_info != "")
                                     <span>{{$store_info->address_one}}</span></td>
                                    @endif
{{--                                    <span>{{@$data->address}}</span></td>--}}
                                <td style="border: none;width: 20px"><img style="margin-left: 8px"
                                                                          src="{{ asset('assets/images/Adress.png') }}"
                                                                          alt=""></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

    </div>
    <div class="____report">

        @yield('body')
    </div>
    <div class="footer">
        <div>
            <table>
                {{--@if($data->pharmacy->email !== null)
                    <tr style="border: none">
                        <td style="border: none; width: 20px"><img src="{{ asset('assets/images/email.png') }}" alt=""></td>
                        <td style="border: none;font-size: 12px; font-weight: 500;"><span>Email: {{$data->pharmacy->email}}</span></td>
                    </tr>
                @endif--}}

            </table>
        </div>
        <div>

        </div>
    </div>
</page>
</body>
</html>
