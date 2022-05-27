@extends('layouts.report.report_layout')
@section('title', 'Wastage Report')
@section('body')

    <header><h1>Wastage Report</h1>
    </header>

    <article>
        <table style="width: auto;">
            <tr>
                <th style="width: 100px;"><span>Document Code</span></th>
                <td style="width: 200px; font-weight: bold;"><span> {{@$wastage->code}}</span></td>
            </tr>
            <tr>
                <th><span>Date</span></th>
                <td><span> {{date('d/m/Y', strtotime(@$wastage->document_date))}}</span></td>
            </tr>
        </table>
    </article>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th style="text-align: center !important;"><span>SL No.</span></th>
                <th><span>Product Name</span></th>
                <th style="text-align: center !important;"><span>Quantity</span></th>
                <th style="text-align: center !important;"><span>Unit Price</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach($wastage_particulars as $key=>$product)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$product->product_title}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->qty}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->unit_price}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->total_amount}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>


        <table class="balance">
            <tr>
                <th><span>Total Amount</span></th>
                <td style="text-align: right !important;"><span> {{@$wastage->total_amount}}</span> <span data-prefix>৳</span></td>
            </tr>

        </table>
    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
