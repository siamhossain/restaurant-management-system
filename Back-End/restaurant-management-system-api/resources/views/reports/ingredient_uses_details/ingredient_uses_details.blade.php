@extends('layouts.report.report_layout')
@section('title', 'Ingredient Usage Details')
@section('body')

    <header><h1>Ingredient Usage Details</h1>
    </header>

    <article>
        <table style="width: auto;">
            <tr>
                <th style="width: 100px;"><span>Document Code</span></th>
                <td style="width: 200px; font-weight: bold;"><span> {{@$purchase_order->code}}</span></td>
            </tr>
            <tr>
                <th><span>Date</span></th>
                <td><span> {{date('d/m/Y', strtotime(@$purchase_order->date))}}</span></td>
            </tr>
            <tr>
                <th><span>Ingredient Name</span></th>
                <td style="text-transform: capitalize; font-weight: bold;"><span> {{@$purchase_order->ingredient->title}}</span></td>
            </tr>
            <tr><th><span>Quantity</span></th>
                <td><span> {{@$purchase_order->quantity}}</span></td>
            </tr>
        </table>
    </article>


    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
