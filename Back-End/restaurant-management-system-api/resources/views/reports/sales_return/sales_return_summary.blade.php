@extends('layouts.report.report_layout')
@section('title', 'Sales Report')
@section('body')

    <header>
        <h1>Sales Return Summary Sheet</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Invoice</span></th>
                <th><span>Customer Name</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
                <th style="text-align: center !important;"><span>Paid Amount</span></th>
                <th style="text-align: center !important;"><span>Return Amount</span></th>
                <th style="text-align: center !important;"><span>Due Amount</span></th>
                <th style="text-align: center !important;"><span>Date Time</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$sales_return_summary as $key=>$product)
                <tr>
                    <td><span>{{$product->code}}</span></td>
                    <td><span>{{$product->customer->name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->total_amount}}</span></td>
                    @if($product->payment_type == 'Cash')
                        <td style="text-align: right !important;"><span>{{$product->received_amount}}</span></td>
                    @else
                        <td style="text-align: right !important;"><span>{{$product->paid_amount}}</span></td>
                    @endif
                    <td style="text-align: right !important;"><span>{{$product->return_amount}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->due_amount}}</span></td>
                    <td style="text-align: right !important;"><span>{{date('d/m/Y h:i:A', strtotime($product->created_at))}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <table class="balance">
            <tr>
                <th><span>Total Amount</span></th>
                <td style="text-align: right !important;"><span> {{$total_amount}}</span> <span data-prefix>৳</span></td>
            </tr>
            <tr>
                <th><span>Total Due</span></th>
                <td style="text-align: right !important;"><span> {{$total_due}}</span> <span data-prefix>৳</span></td>
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
