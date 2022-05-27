@extends('layouts.report.report_layout')
@section('title', 'Sales Report')
@section('body')

    <header>
        <h1>Wastage Summary Sheet</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Invoice</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
                <th style="text-align: center !important; width: 130px;"><span>Date Time</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$wastage_summary as $key=>$product)
                <tr>
                    <td><span>{{$product->code}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->total_amount}}</span></td>
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
        </table>

    </article>
    @isset($user)
        <p><b>Sales By:</b> <span> {{@$user->name}} @if(@$user->role != null) ({{@$user->role->name}}) @endif</span></p>
    @endisset

    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
