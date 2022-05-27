@extends('layouts.report.report_layout')
@section('title', 'Purchase Order')
@section('body')

    <header><h1>Purchase Invoice</h1>
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
            @foreach(@$purchase_summary as $key=>$summary)
                <tr>
                    <td><span>{{$summary->code}}</span></td>
                    <td><span>{{$summary->supplier->full_name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$summary->payable_amount}} <span data-prefix>৳</span></span></td>
                    <td style="text-align: right !important;"><span>{{date('d/m/Y h:i:A', strtotime($summary->created_at))}}</span></td>
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
