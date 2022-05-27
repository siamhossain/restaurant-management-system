<?php

namespace App\Http\Controllers\Admin\Classes;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Models\CustomerPayment;
use App\Models\SupplierPayment;
use Illuminate\Support\Facades\DB;

class PaymentEntryHandler
{
    public static function CustomerPaymentHandler($payment_data, $income_entry = true)
    {
        DB::beginTransaction();
        $payment_data = (object)$payment_data;

        $customer_payment = null;

        if ((string)$payment_data->uuid != null) {
            $customer_payment = CustomerPayment::where('uuid', '=', $payment_data->uuid);
        } elseif ((boolean)$payment_data->is_auto_entry && (string)$payment_data->uuid == null && (string)$payment_data->note != null) {
            $customer_payment = CustomerPayment::where('note', '=', $payment_data->note);
        }

        if ($customer_payment != null && $customer_payment->exists()) {
            $customer_payment = $customer_payment->first();
//            $customer_payment->updated_by_uuid = auth()->user()->uuid;
        } else {
            $customer_payment = new CustomerPayment();
            $module_code = UAP::$MODULES['CUSTOMER_PAYMENT']['Code'];
            $prefix = UAP::$MODULES['CUSTOMER_PAYMENT']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $customer_payment->code = $generated_doc_code;
//            $customer_payment->created_by_uuid = auth()->user()->uuid;
            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }



        //return $reference;


        $customer_payment->date = (string)$payment_data->date;
        $customer_payment->customer_uuid = (string)$payment_data->customer_uuid;
        $customer_payment->reference = $payment_data->reference;
        $customer_payment->paid_amount = (double)$payment_data->paid_amount;
        $customer_payment->is_auto_entry = (boolean)$payment_data->is_auto_entry;
        $customer_payment->note = (string)$payment_data->note;
        $customer_payment->save();

        if ($customer_payment->save()) {
            if (AccountingHandler::autoEntryEnabled() && $income_entry) {
                $accounting_setting = AccountingHandler::getSettings('customer_payment');

                if($accounting_setting) {

                    AccountingHandler::makeEntry([
                        'uuid' => '',
                        'is_auto_entry' => true,
                        'account_category_uuid' => $accounting_setting->account_category_uuid,
                        'account_category_name' => $accounting_setting->account_category_name,
                        'account_head_uuid' => $accounting_setting->account_head_uuid,
                        'account_head_name' => $accounting_setting->account_head_name,
                        'type' => 'Income',
                        'comment' => $customer_payment->code,
                        'total_amount' => $customer_payment->paid_amount,
                        'document_date' => $customer_payment->document_date,
                    ]);
                }
            }
        }

        DB::commit();
    }


    public static function SupplierPaymentHandler($payment_data, $expense_entry = true)
    {
        DB::beginTransaction();
        $payment_data = (object)$payment_data;

        $supplier_payment = null;

        if ((string)$payment_data->uuid != null) {
            $supplier_payment = SupplierPayment::where('uuid', '=', $payment_data->uuid);
        } elseif ((boolean)$payment_data->is_auto_entry && (string)$payment_data->uuid == null && (string)$payment_data->comment != null) {
            $supplier_payment = SupplierPayment::where('comment', '=', $payment_data->comment);
        }

        if ($supplier_payment != null && $supplier_payment->exists()) {
            $supplier_payment = $supplier_payment->first();
//            $supplier_payment->updated_by_uuid = auth()->user()->uuid;
        } else {
            $supplier_payment = new SupplierPayment();
            $module_code = UAP::$MODULES['SUPPLIER_PAYMENT']['Code'];
            $prefix = UAP::$MODULES['SUPPLIER_PAYMENT']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $supplier_payment->code = $generated_doc_code;
//            $supplier_payment->created_by_uuid = auth()->user()->uuid;
            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        $supplier_payment->document_date = (string)$payment_data->document_date;
        $supplier_payment->supplier_uuid = (string)$payment_data->supplier_uuid;
        $supplier_payment->total_amount = (double)$payment_data->amount;
        $supplier_payment->comment = (string)$payment_data->comment;
        $supplier_payment->save();

        if ($supplier_payment->save()) {
            if (AccountingHandler::autoEntryEnabled() && $expense_entry) {
                $accounting_setting = AccountingHandler::getSettings('supplier_payment');

                if($accounting_setting) {
                    AccountingHandler::makeEntry([
                        'uuid' => '',
                        'is_auto_entry' => true,
                        'account_category_uuid' => $accounting_setting->account_category_uuid,
                        'account_category_name' => $accounting_setting->account_category_name,
                        'account_head_uuid' => $accounting_setting->account_head_uuid,
                        'account_head_name' => $accounting_setting->account_head_name,
                        'type' => 'Expense',
                        'comment' => $supplier_payment->code,
                        'total_amount' => $supplier_payment->paid_amount,
                        'document_date' => $supplier_payment->document_date,
                    ]);
                }
            }
        }

        DB::commit();
    }
}
