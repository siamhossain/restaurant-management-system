@extends('layouts.report.report_layout')
@section('title', 'Stock Report')
@section('body')

    <header><h1>Stock Report</h1>
    </header>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th style="text-align: center !important;"><span>SL No.</span></th>
                <th style="text-align: center !important;"><span>Code</span></th>
                <th><span>Product Name</span></th>
                <th style="text-align: center !important;"><span>Category Name</span></th>
                <th style="text-align: center !important;"><span>Brand Name</span></th>
                <th style="text-align: center !important;"><span>Unit Name</span></th>
                <th style="text-align: center !important;"><span>Stock</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach(@$products as $key=>$product)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$product->code}}</span></td>
                    <td><span>{{$product->title}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->category->name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->brand->name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->unit->name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->stock}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <table class="balance">
            <tr>
                <th><span>Total Stock</span></th>
                <td style="text-align: right !important;"><span> {{@$total_stock}}</span> </td>
            </tr>

        </table>
    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
