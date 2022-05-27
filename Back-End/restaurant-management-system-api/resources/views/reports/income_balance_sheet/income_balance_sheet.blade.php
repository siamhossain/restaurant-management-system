@extends('layouts.report.report_layout')
@section('title', 'Income Balance Sheet')
@section('body')

    <?php
    $total_profit = 0;
    $total_expense = 0;
    $profit = 0;
    ?>
    <style>

        article {
            width: 60%;
            margin: 0 auto;
        }

        header {
            margin: 0;
        }

        .total {
            border: 1px solid #2a2a2a;
        }

        .total td {
            font-size: 16px;
            font-weight: bold;
        }
    </style>
    <header><h1>Income Balance Sheet</h1>

    </header>

    <article>
        <table style="width: auto;">
            <tr>
                <th style="width: 80px;"><span>From Date</span></th>
                <td><span> {{$from_date}}</span></td>
                <th style="width: 80px;"><span>To Date</span></th>
                <td><span> {{$to_date}}</span></td>
            </tr>

        </table>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Date</span></th>
                <th><span>Total Expense</span></th>
                <th><span>Profit From Total Sales</span></th>
            </tr>
            </thead>
            <tbody>

            @foreach($dates as $date)
                <?php
                $total_profit += \App\Helpers\Helper::getTotalSalesProfit($date);
                $total_expense += \App\Helpers\Helper::getTotalExpense($date);
                ?>

                <tr>
                    <td>{{$date}}</td>
                    <td>{{ \App\Helpers\Helper::getTotalExpense($date) }}</td>
                    <td>{{\App\Helpers\Helper::getTotalSalesProfit($date)}}</td>
                </tr>
            @endforeach
            <tr class="total">
                <td style="text-align: right"><b>Grand Total:</b></td>
                <td><b>{{$total_expense}}</b></td>
                <td><b>{{ $total_profit }}</b></td>
            </tr>
            <tr>
                <?php
                $profit = $total_profit - $total_expense;
                ?>
                <td style="text-align: center; font-size: 16px;" colspan="3">Income Balance
                    : @if($profit > 0) {{$profit}} tk <span
                        style="color: green;">(Profit)</span> @else {{ abs($profit)}} tk <span
                        style="color: red">(Loss)</span> @endif</td>
            </tr>
            </tbody>
        </table>

    </article>
    <script>
        window.onload = function () {
            window.print();
        }
    </script>
@endsection
