@extends('layouts.report.report_layout')
@section('title', 'Accounting Histories Report')
@section('body')

    <header><h1>Accounting Histories Report</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th style="text-align: center !important;"><span>SL No.</span></th>
                <th style="text-align: center !important;"><span>Code</span></th>
                <th><span>Date</span></th>
                <th style="text-align: center !important;"><span>Comment</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$accounting_history as $key=>$account)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$account->code}}</span></td>
                    <td><span>{{$account->date}}</span></td>
                    <td style="text-align: right !important;"><span>{{$account->comment}}</span></td>
                    <td style="text-align: right !important;"><span>{{$account->total_amount}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <table class="balance">
            <tr>
                <th><span>Total Amount</span></th>
                <td style="text-align: right !important;"><span> {{@$total_amount}}</span> </td>
            </tr>

        </table>
    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
