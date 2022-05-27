@extends('layouts.report.report_layout')
@section('title', 'General Ledger Summary Report')
@section('body')

    <style>
        table.inventory td:nth-child(1){text-align: center}
        table.inventory td:nth-child(2){text-align: center}
        table.inventory td:nth-child(3){text-align: center}
        table.inventory td:nth-child(4){text-align: center}
        table.inventory td:nth-child(5){text-align: center}
        table.inventory td:nth-child(6){text-align: center}
        table.inventory td:nth-child(7){text-align: center}
    </style>

        <header style=" display: flex; justify-content: space-between; align-items: center;">
            <span><b>From Date:</b> {{$from_date}}</span>
            <h1>General Ledger Summary Report</h1>
            <span><b>To Date:</b> {{$to_date}}</span>
        </header>

    <article>
        @php
            $income = 0;
            $expense = 0;
        @endphp
        <table class="inventory">
            <thead>
            <tr>
                <th style="width: 100px;"><span>Date.</span></th>
                <th style="width: 100px;"><span>Voucher</span></th>
                <th><span>Account Head</span></th>
                <th style="width: 70px;"><span>Type</span></th>
                <th style="text-align: center !important; width: 70px;"><span>Debit</span></th>
                <th style="text-align: center !important; width: 70px;"><span>Credit</span></th>
                <th style="text-align: center !important; width: 70px;"><span>Balance</span></th>
            </tr>
            </thead>
            <tbody>

            @foreach($ledger_summary as $key=>$summary)
                @php
                    if($summary->type == "Income"){
                        $income = $summary->total_amount + $income;
                   }
                   elseif($summary->type == "Expense"){
                        $expense = $summary->total_amount + $expense;
                   }
                   $balance = $income - $expense
                @endphp


                <tr>
                    <td><span>{{date('Y-m-d',strtotime($summary->date))}}</span></td>
                    <td><span>{{$summary->code}}</span></td>
                    <td><span>{{$summary->account_head_name}}</span></td>
                    <td><span>{{$summary->type}}</span></td>
                    <td style="text-align: right !important;"><span>@if($summary->type == "Income"){{$summary->total_amount}}@endif</span></td>
                    <td style="text-align: right !important;"><span>@if($summary->type == "Expense"){{$summary->total_amount}}@endif</span></td>
                    <td style="text-align: right !important;"><span>
                            @if($balance > 0)
                                {{$balance}} (de)
                            @else
                                {{abs($balance)}} (cr)
                            @endif
                        </span></td>
                </tr>
            @endforeach

            <tr>

                <td style="font-weight: bold; text-align: right !important;" colspan="4"><span><b>Grand Total</b></span></td>
                <td style="text-align: right !important;"><span> {{$total_income}}</span> <span id="prefix">৳</span></td>
                <td style="text-align: right !important;"><span> {{$total_expense}}</span> <span id="prefix">৳</span></td>
            </tr>
            </tbody>
        </table>

    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
