<!DOCTYPE html>
<html lang="en">
<head>
    <title>Invoice</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style type="text/css">

        /* ISO Paper Size */
        @page {
            size: A7 portrait;
        }

        /* Size in mm */
        @page {
            size: 80mm auto portrait;
        }

        /* Size in inches */
        @page {
            size: 2.91in auto portrait;
        }

        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 80mm;
            background: #FFF;
        }

        ::selection {
            background: #f31544;
            color: #FFF;
        }

        ::moz-selection {
            background: #f31544;
            color: #FFF;
        }

        h1 {
            font-size: 1.5em;
            color: #222;
        }

        h2 {
            font-size: 12px;
        }

        h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }

        p {
            font-size: .9em;
            color: #000;
            line-height: 1.2em;
        }

        #mid, #bot { /* Targets all id with 'col-' */
            border-bottom: 1px solid #666;
        }

        #top {
            min-height: 40px;
        }

        #mid {
            text-align: center;
        }

        #bot {
            min-height: 50px;
        }

        #top .logo {
        / / float: left;
            height: 35px;
            /*width: 100px;*/
            /*background: url('http://firojtraders.localhost/assets/img/p-logo.png') no-repeat;*/
            background-size: 100px 34px;
        }

        .clientlogo {
            float: left;
            height: 60px;
            width: 60px;
            /*background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;*/
            background-size: 60px 60px;
            border-radius: 50px;
        }

        .info {
            display: block;
        / / float: left;
            margin-left: 0;
        }

        .title {
            float: right;
        }

        .title p {
            text-align: right;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
        / / padding: 5 px 0 5 px 15 px;
        / / border: 1 px solid #EEE
        }

        .tabletitle {
        / / padding: 5 px;
            font-size: .5em;
            border-bottom: 1px solid #666;

        }

        /*.service{ border-bottom: 1px dotted #666;}*/
        .item {
            width: 24mm;
        }

        .itemtext {
            font-size: 12px; /* font-weight: 600; */
        }

        #legalcopy {
            margin-top: 5px;
            text-align: center;
        }

        .vat_info {
            text-align: left;
            /*border-top: 1px dotted #000;*/
            border-top: 1px solid #000;
            padding-top: 5px;
        }

        .vat_info p {
            padding-bottom: 0px;
            margin-bottom: 5px;
            margin-top: 0px;
        }


        .item {
            width: 56mm;
            /*border-right: 1px solid #666;*/
        }

        /*td.tableitem {*/
        /*    border-right: 1px  dotted #666;*/
        /*}*/

        /*td.tableitem:last-child {*/
        /*    border-right: 0;*/
        /*}*/
        .itemtext {
            padding-bottom: 0px;
            margin: 4px 0px;
        }

        tr.border_bottom {
            border-bottom: 1px solid #666;
            /* padding: 8px 0px; */
        }

        h2 {
            margin-bottom: 0px;
            padding: 5px 0px;
            color: #000;
            margin-top: 1px;
        }

        div#powered_by {
            border-top: 4px double #666;
            padding: 5px 0px;
            text-align: center;
        }

        div#powered_by p {
            margin: 0px;
        }

        .info p {
            padding: 0px;
            margin: 0;
            margin-bottom: 5px;
        }

        .invoice_print_area {
            margin: 0 auto;
            width: 100%;
            margin: 0 auto;
            width: 80mm;
            background: #FFF;
        }

        .footer_button_div {
            background: #fff;
            width: 100%;
            padding: 5px 8px;
            display: flex;
        }

        .print_btn {
            padding: 3px 10px;
            background: red;
            border: none;
            cursor: pointer;
            color: #fff;
            font-weight: 600;
        }

        #top .logo p {
            padding: 0;
            margin: 0px;
        }

        #top .logo h2 {
            font-size: 16px;
            text-align: center;
            font-weight: 600;
        }

        #top .logo h5 {
            margin: 0;
            padding-top: 5px;
        }

        span.date_no, span.rec_no {
            font-size: 16px;
            font-weight: 700;
            display: inline-block;
        }

        span.date_no {
        }

        span.date_no {
            float: right;
        }

    </style>

</head>
<body>

<div class="invoice_print_area">
    <div id="invoice-POS">

        <center id="top">
            <div class="logo">
                @php
                    $cdn = "https://edorpon-static.s3.ap-southeast-1.amazonaws.com/e-shop-v2/";

                $logo = $cdn . $store_info->logo_uri;
                @endphp
                @if(@$logo != null)
                    <img src="{{$logo}}" width="70"/>
                @else
                    <h2>{{@$logo}}</h2>
                @endif

                <p>{{@$store_info->address_one}}</p>
                {{--            <h5>VAT Reg. :000475068-1001</h5>--}}
            </div>
            <!--        <div class="info">-->
            <!--            <h2>RMS</h2>-->
            <!--        </div>&lt;!&ndash;End Info&ndash;&gt;-->
        </center><!--End InvoiceTop-->

        <div id="mid">
            <div class="info" style="margin-top: 10px">
                <!--            <h2>Contact Info</h2>-->


            </div>
            <div class="vat_info">
                <!-- <p><span>Vat</span> - 6.3</p> -->
                <!-- <p><span>Vat Reg.</span> <span>:</span> 6.3</p> -->
                <p><span class="rec_no">{{@$sales_order->code}}</span><span
                        class="date_no">{{@$sales_order->created_at->format('d-M-Y')}}</span></p>
                <p><span>C. Name</span> <span>:</span> {{@$sales_order->customer->name}} </p>
                <p><span>C. Phone</span> <span>:</span> {{@$sales_order->customer->phone_number}}</p>
                <p><span>SP</span> <span>:</span><span class="rec_no"
                                                       style="font-weight: 400">{{@$sales_order->sales_by->name}}</span><span
                        class="date_no">Time:{{@$sales_order->created_at->format('h:i:s A')}}</span></p>

            </div>
        </div><!--End invoice Mid-->

        <div id="bot">

            <div id="table">
                <table style="width:100%">

                    <tr class="tabletitle" style="width:100%">

                        <td class="item" colspan="2"><h2>Item/Description</h2></td>
                        <td colspan="2" style=""><h2 style="padding-left:5px;padding-right: 5px">Qty</h2></td>
                        <td colspan="2" style=""><h2>MRP</h2></td>
                        <td class="Rate" style="float:right"><h2>Amount</h2></td>
                    </tr>

                    @foreach(@$sales_order_particulars as $item)

                        <tr class="service">
                            <td class="tableitem" colspan="2"><p class="itemtext">{{$item->product_name}}</p></td>
                            <td class="tableitem" colspan="2"><p class="itemtext"
                                                                 style="text-align: center">{{$item->quantity}}</p></td>
                            <td class="tableitem" colspan="2"><p class="itemtext">{{$item->unit_price}}</p></td>
                            <td class="tableitem" style="float:right"><p
                                    class="itemtext">{{$item->unit_price*$item->quantity}}</p></td>
                        </tr>
                    @endforeach


                    <tr class="" style="    border: 1px solid #000;border-left: 0;border-right: 0px;">
                        <td colspan="6" style="text-align: right;"><h2>Subtotal: </h2></td>

                        <td><h2 style="text-align:right">{{number_format(@$sales_order->total_amount)}}</h2></td>
                    </tr>
                    <tr class="">
                        <td colspan="6" style="text-align: right;"><h2>Discount:</h2></td>
                        <td><h2 style="text-align:right">{{number_format(@$sales_order->discount,2)}}</h2></td>
                        {{--                    {{dd(@$sales_order)}}--}}
                    </tr>
                    <tr class="">
                        <td colspan="6" style="text-align: right;"><h2>+ VAT:</h2></td>
                        <td><h2 style="text-align:right">{{number_format(@$sales_order->vat)}}</h2></td>

                    </tr>
                    <tr class="">
                        <td colspan="6" style="text-align: right;"><h2>Net Amount:</h2></td>
                        <td><h2 style="text-align:right">{{number_format(@$sales_order->payable_amount)}}</h2></td>
                        {{--                    <td ><h2 style="text-align:right">{{@$sales_order->due}}</h2></td>--}}
                    </tr>
                    <tr class="">
                        <td colspan="6" style="text-align: right;"><h2>Paid Amount:</h2></td>
                        @if($sales_order->payment_type === 'Cash')
                            <td><h2 style="text-align:right">{{number_format(@$sales_order->received_amount,2)}}</h2>
                            </td>
                        @else
                            <td><h2 style="text-align:right">{{number_format(@$sales_order->paid_amount,2)}}</h2></td>
                        @endif

                    </tr>
                    <tr class="">
                        @if(@$sales_order->due_amount > 0)
                            <td colspan="6" style="text-align: right;"><h2>Due Amount:</h2></td>
                            <td><h2 style="text-align:right">{{number_format(@$sales_order->due_amount,2)}} </h2></td>
                        @else
                            <td colspan="6" style="text-align: right;"><h2>Change Amount:</h2></td>
                            <td>
                                <h2 style="text-align:right">{{number_format(@$sales_order->received_amount-@$sales_order->payable_amount,2)}} </h2>
                            </td>
                        @endif

                    </tr>
                    <!--  <tr class="">
                         <td></td>
                         <td style="float:right"><h2>Change:</h2></td>
                         <td ><h2>$419.25</h2></td>
                     </tr> -->
                    <tr class="border_bottom">
                        <td colspan="6"><h2>Payment Mode:</h2></td>
                        <td><h2 style="text-align:right">{{@$sales_order->payment_type}}</h2></td>
                    </tr>
                    <tr class="border_bottom">
                        <td colspan="6"><h2>CASH:</h2></td>
                        @if(@$sales_order->paid_amount > 0)
                            <td><h2 style="text-align:right">{{number_format(@$sales_order->received_amount)}}</h2></td>
                        @else
                            <td><h2 style="text-align:right">{{number_format(@$sales_order->total_amount)}}</h2></td>
                        @endif
                        {{--                    <td ><h2 style="text-align:right">{{@$sales_order->total}}</h2></td>--}}
                    </tr>

                </table>
            </div><!--End Table-->

            <div id="legalcopy">
                <p class="legal"><strong>Thank you for your Shopping!</strong>  <!--Sold item cannot be refunded but can be exchanged  within 7 days; please
                process this invoice within that time. -->
                </p>
            </div>
            <div id="powered_by">
                <p>***Powered by: eDorpon | Dhaka, Bangladesh***</p>
                <p>***Contact No: +88 01888 015 000***</p>
                <p>***www.edorpon.com***</p>
            </div>

        </div><!--End InvoiceBot-->

    </div><!--End invoice-->
    <div class="footer_button_div">
        <input type="button" class="btn btn-sm btn-primary print_btn" onclick="printDiv('invoice-POS')" value="Print"/>
    </div>
</div>


<!-- <script src="js/vendor/jquery-3.2.1.slim.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/main.js"></script> -->
<script>
    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
</script>

</body>
</html>
