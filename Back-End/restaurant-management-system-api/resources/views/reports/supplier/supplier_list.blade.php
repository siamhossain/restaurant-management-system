@extends('layouts.report.report_layout')
@section('title', 'Supplier List')
@section('body')

    <header><h1>Supplier List</h1>
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
            @foreach(@$suppliers as $key=>$supplier)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$supplier->code}}</span></td>
                    <td><span>{{$supplier->full_name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$supplier->phone_number}}</span></td>
                    <td style="text-align: right !important;"><span>{{$supplier->email}}</span></td>
                    <td style="text-align: right !important;"><span>{{$supplier->total_due}}</span></td>
                    <td style="text-align: right !important;"><span>{{$supplier->advanced}}</span></td>
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
