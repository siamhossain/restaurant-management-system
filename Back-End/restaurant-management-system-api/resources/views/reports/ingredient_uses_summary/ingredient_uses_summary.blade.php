@extends('layouts.report.report_layout')
@section('title', 'Ingredients Report')
@section('body')

    <header>
        <h1>Ingredients Usage Summary Sheet</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th><span>Invoice</span></th>
                <th><span>Ingredient Name</span></th>
                <th style="text-align: center !important;"><span>Quantity</span></th>
                <th style="text-align: center !important;"><span>Sales Type</span></th>
                <th style="text-align: center !important; width: 130px;"><span>Date Time</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$ingredient_uses_summary as $key=>$product)
                <tr>
                    <td><span>{{$product->code}}</span></td>
                    <td><span>{{$product->ingredient->title}}</span></td>
                    <td><span>{{$product->quantity}}</span></td>
                    @if(@$product->is_online_order)
                        <td style="text-align: right !important;"><span>Online Sales</span></td>
                    @else
                        <td style="text-align: right !important;"><span>Pos Sales</span></td>
                    @endif
                    <td style="text-align: right !important;"><span>{{date('d/m/Y h:i:A', strtotime($product->created_at))}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>


    </article>
    @isset($user)
        <p><b>Sales By:</b> <span> {{@$user->name}} @if(@$user->role != null) ({{@$user->role->name}}) @endif</span></p>
    @endisset

    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
