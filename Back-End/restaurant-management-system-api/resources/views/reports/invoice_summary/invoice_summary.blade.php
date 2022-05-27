@extends('layouts.report.report_layout')
@section('title', ' Invoice Summary Report')
@section('body')

    <header>
        <h1>{{@$type}} Invoice Summary Sheet</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Invoice</span></th>
                <th><span>{{@$type}} Name</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
                <th style="text-align: center !important; width: 130px;"><span>Date Time</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$invoice_summary as $key=>$invoice)
                <tr>
                    <td><span>{{$invoice->code}}</span></td>
                    @if(@$type === 'Customer')
                        <td><span>{{$invoice->customer->name}}</span></td>
                    @elseif(@$type === 'Supplier')
                        <td><span>{{$invoice->supplier->full_name}}</span></td>
                    @endif
                    <td style="text-align: right !important;"><span>{{$invoice->amount}} <span data-prefix>৳</span></span></td>
                    <td style="text-align: right !important;"><span>{{date('d/m/Y h:i:A', strtotime($invoice->created_at))}}</span></td>
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
