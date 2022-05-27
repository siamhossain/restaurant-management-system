<?php

namespace App\Helpers;
class SendSms{

public static function send($number,$msg){
    $masking = 'eDorpon';
    $userName = 'eDorpon';
    $password = 'a4f87e1f3a2179ef37115ec1972e6ecf';
    $MsgType = 'NUMBER';
    $receiver = $number;
    $message = $msg;
    $url = 'http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php';
    $my_vars = 'masking=' . $masking . '&userName=' . $userName . '&userName=' . $password . '&MsgType=' . $MsgType . '&receiver=' . $receiver . '&message=' . $message;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $my_vars);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    return curl_exec($ch);
}

}
