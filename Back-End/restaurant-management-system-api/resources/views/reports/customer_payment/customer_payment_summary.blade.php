@extends('layouts.report.report_layout')
@section('title', 'Customer Payment Summary Report')
@section('body')

    <header style=" display: flex; justify-content: space-between; align-items: center;">
        <span><b>From Date:</b> {{@$from_date}}</span>
        <h1>Customer Payment Summary Sheet</h1>
        <span><b>To Date:</b> {{@$to_date}}</span>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Invoice</span></th>
                <th><span>Customer Name</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
                <th style="text-align: center !important; width: 130px;"><span>Date Time</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$customer_payment_summary as $key=>$product)
                <tr>
                    <td><span>{{$product->code}}</span></td>
                    <td><span>{{$product->customer->name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->paid_amount}} <span data-prefix>৳</span></span></td>
                    <td style="text-align: right !important;"><span>{{date('d/m/Y h:i:A', strtotime($product->created_at))}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <table class="balance">
            <tr>
                <th><span>Total Amount</span></th>
                <td style="text-align: right !important;"><span> {{@$total_amount}}</span> <span data-prefix>৳</span></td>
            </tr>
        </table>

    </article>
    @isset($user)
        <p><b>Sales By:</b> <span> {{@$user->name}} @if(@$user->role != null) ({{@$user->role->name}}) @endif</span></p>
    @endisset

    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
