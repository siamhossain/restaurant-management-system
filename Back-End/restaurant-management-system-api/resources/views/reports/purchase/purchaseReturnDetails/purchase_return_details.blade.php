@extends('layouts.report.report_layout')
@section('title', 'Purchase Return Report')
@section('body')

    <header><h1>Purchase Return Invoice</h1>
    </header>

    <article>
        <table style="width: auto;">
            <tr>
                <th style="width: 100px;"><span>Document Code</span></th>
                <td style="width: 200px; font-weight: bold;"><span> {{@$purchase_order_return->code}}</span></td>
            </tr>
            <tr>
                <th><span>Date</span></th>
                <td><span> {{date('d/m/Y', strtotime(@$purchase_order_return->document_date))}}</span></td>
            </tr>
            <tr>
                <th><span>Supplier</span></th>
                <td style="text-transform: capitalize; font-weight: bold;"><span> {{@$purchase_order_return->supplier->full_name}}</span></td>
            </tr>
            <tr><th><span>Phone</span></th>
                <td><span> {{@$purchase_order_return->supplier->phone_number}}</span></td>
            </tr>
            <tr>
                <th><span>Address</span></th>
                <td><span> {{@$purchase_order_return->supplier->address}}</span></td>
            </tr>
        </table>
    </article>

    <article>

        <table class="inventory">
            <thead>
            <tr>
                <th style="text-align: center !important;"><span>SL No.</span></th>
                <th><span>Product Name</span></th>
                <th style="text-align: center !important;"><span>Quantity</span></th>
                <th style="text-align: center !important;"><span>Unit Price</span></th>
                <th style="text-align: center !important;"><span>Total Amount</span></th>
            </tr>
            </thead>
            <tbody>
            @foreach($purchase_order_particulars_return as $key=>$product)
                <tr>
                    <td style="text-align: center !important;"><span>{{$key+1}}</span></td>
                    <td><span>{{$product->product_name}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->quantity}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->unit_price}}</span></td>
                    <td style="text-align: right !important;"><span>{{$product->total_price}}</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>


        <table class="balance">
            <tr>
                <th><span>Total Amount</span></th>
                <td style="text-align: right !important;"><span> {{@$purchase_order_return->total_amount}}</span> <span data-prefix>৳</span></td>
            </tr>
            <tr>
                <th><span>Vat</span></th>
                <td style="text-align: right !important;"><span> {{@$purchase_order_return->vat}}</span> <span data-prefix>৳</span></td>
            </tr>
            <tr>
                <th><span>Adjust/Discount</span></th>
                <td style="text-align: right !important;"><span> {{@$purchase_order_return->discount}}</span> <span data-prefix>৳</span></td>
            </tr>
            <tr>
                <th><span>Tax</span></th>
                <td style="text-align: right !important;"><span> {{@$purchase_order_return->tax}}</span> <span data-prefix>৳</span></td>
            </tr>
            <tr>
                <th><span>Payment Amount</span></th>
                <td style="font-weight: bold; text-align: right !important;"><span> {{@$purchase_order_return->payment_amount}}</span> <span data-prefix>৳</span></td>
            </tr>

            <tr>
                <th><span>Payment Type</span></th>
                <td style="text-transform: capitalize; font-weight: bold; text-align: right !important;"><span> {{@$purchase_order_return->payment_type}}</span></td>
            </tr>
            @if(@$purchase_order_return->payment_type === 'Cash')
                <tr>
                    <th><span>Received Amount</span></th>
                    <td style="text-align: right !important;"><span> {{@$purchase_order_return->received_amount}}</span> <span
                            data-prefix>৳</span></td>
                </tr>
                <tr>
                    <th><span>Return Amount</span></th>
                    <td style="text-align: right !important;"><span> {{@$purchase_order_return->return_amount}}</span> <span
                            data-prefix>৳</span></td>
                </tr>
            @endif

            @if(@$purchase_order_return->payment_type === 'Credit')
                <tr>
                    <th><span>Paid Amount</span></th>
                    <td style="text-align: right !important;"><span> {{@$purchase_order_return->paid_amount}}</span> <span
                            data-prefix>৳</span></td>
                </tr>
                <tr>
                    <th><span>Due Amount</span></th>
                    <td style="font-weight: bold; text-align: right !important;"><span> {{@$purchase_order_return->due_amount}}</span> <span
                            data-prefix>৳</span></td>
                </tr>
            @endif
        </table>
    </article>
    <script>
        window.onload = function() { window.print();}
    </script>
@endsection
