@extends('layouts.report.report_layout')
@section('title', 'General Ledger Summary Report')
@section('body')
    <style>
        header {
            margin: 0;
        }

        .loss_profit {
            width: 100%;
        }

        .profit, .loss {
            width: 45%;
            float: left;
            margin-left: 20px;
        }
    </style>
    <header><h1>Profit/Loss Report</h1></header>


    <article>

        <div class="loss_profit">
            <div class="loss">
                <h3>Expense List</h3>
                <table class="inventory">
                    <thead>
                    <tr>
                        <th style="text-align: center !important;"><span>SL No.</span></th>
                        <th><span>Date</span></th>
                        <th><span>Comment</span></th>
                        <th style="text-align: center !important;"><span>Amount</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(@$expense_list as $key=>$expense)
                        <tr>
                            <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                            <td><span>{{date('d/m/Y',strtotime($expense->date))}}</span></td>
                            <td><span>{{$expense->comment}}</span></td>
                            <td style="text-align: right !important;"><span>{{$expense->total_amount}} </span>৳</td>

                        </tr>
                    @endforeach
                    <tr>
                        <th colspan="3" style="text-align: right"><span>Total Expense</span></th>
                        <td style="color: green; font-weight: bold;font-size: 14px; text-align: right !important;">
                            <span> {{@$total_expense}}</span> <span data-prefix>৳</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="profit">
                <h3>Income List</h3>
                <table class="inventory">
                    <thead>
                    <tr>
                        <th style="text-align: center !important;"><span>SL No.</span></th>
                        <th><span>Date</span></th>
                        <th><span>Comment</span></th>
                        <th style="text-align: center !important;"><span>Amount</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(@$income_list as $key=>$income)
                        <tr>
                            <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                            <td><span>{{date('d/m/Y',strtotime($income->document_date))}}</span></td>
                            <td><span>{{$income->comment}}</span></td>
                            <td style="text-align: right !important;"><span>{{$income->total_amount}} </span>৳</td>

                        </tr>
                    @endforeach
                    <tr>
                        <th colspan="3" style="text-align: right"><span>Total Income</span></th>
                        <td style="color: green; font-weight: bold;font-size: 14px; text-align: right !important;">
                            <span> {{@$total_income}}</span> <span data-prefix>৳</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <table class="balance">
            <tr>
                <th><span>Total</span></th>
                @if( @$profit > 0)
                    <td style="color:green;background:white; text-align: right !important;"><span> {{@$profit}} <span
                                data-prefix>৳</span> Profit</span>
                    </td>
                @elseif($loss > 0)
                    <td style="color:red;background:white; text-align: right !important;">
                        <span> {{@$loss}} <span data-prefix>৳</span> Loss</span>
                    </td>
                @endif
            </tr>
        </table>
    </article>
    <script>
        window.onload = function () {
            window.print();
        }
    </script>
@endsection
