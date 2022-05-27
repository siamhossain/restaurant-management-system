@extends('layouts.report.report_layout')
@section('title', 'Customer List')
@section('body')

    <header><h1>Customer List</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th style="text-align: center !important; width: 50px"><span>SL No.</span></th>
                <th style="text-align: center !important; width: 100px;"><span>Code</span></th>
                <th><span>Name</span></th>
                <th style="text-align: center !important;"><span>Phone</span></th>
                <th style="text-align: center !important;"><span>Email</span></th>
                <th style="text-align: center !important; width: 70px"><span>Due</span></th>
                <th style="text-align: center !important; width: 100px"><span>Advance</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$customers as $key=>$customer)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$customer->code}}</span></td>
                    <td><span>{{$customer->full_name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$customer->personal_phone}}</span></td>
                    <td style="text-align: right !important;"><span>{{$customer->email}}</span></td>
                    <td style="text-align: right !important;"><span>{{$customer->total_due}}</span></td>
                    <td style="text-align: right !important;"><span>{{$customer->advanced}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <table class="balance">
            <tr>
                <th><span>Total Advance</span></th>
                <td style="text-align: right !important;"><span> {{@$total_advanced}}</span> </td>
            </tr>
            <tr>
                <th><span>Total Due</span></th>
                <td style="text-align: right !important;"><span> {{@$total_dues}}</span> </td>
            </tr>

        </table>
    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
