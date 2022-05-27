<?php

namespace App\Http\Controllers\Admin\Classes;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Models\Due;
use Illuminate\Support\Facades\DB;

class DueInvoiceHandler
{
    /**
     * @param array $invoiceData ['uuid' => (string), 'code' => (string), 'comment' => (string), 'document_date' => (string), 'is_auto_entry' => (boolean), 'participant_type' => ('Customer' | 'Supplier'), 'participant_uuid' => (string), 'amount' => (string | double)]
     * @return bool|object
     */
    public static function createOrUpdateInvoice($invoiceData)
    {
        DB::beginTransaction();
        $invoiceData = (object)$invoiceData;
        $due_invoice = null;

        //return $invoiceData;

        if((string)$invoiceData->uuid != null) {
            $due_invoice = Due::where('uuid', '=', $invoiceData->uuid);
        } elseif((boolean)$invoiceData->is_auto_entry && (string)$invoiceData->uuid == null && (string)$invoiceData->comment != null) {
            $due_invoice = Due::where('is_auto_entry', '=', (int)$invoiceData->is_auto_entry)->where('comment', '=', $invoiceData->comment);
        }

        if ($due_invoice != null && $due_invoice->exists()) {
            $due_invoice = $due_invoice->first();
        } else {
            $due_invoice = new Due();

            $module_code = UAP::$MODULES['DUE']['Code'];
            $prefix = UAP::$MODULES['DUE']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

            $due_invoice->code = $generated_doc_code;
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        if($due_invoice != null) {
            $due_invoice->date = (string)$invoiceData->date;
            $due_invoice->is_auto_entry = $invoiceData->is_auto_entry;
            $due_invoice->participant_type = (string)$invoiceData->participant_type;
            $due_invoice->participant_uuid = (string)$invoiceData->participant_uuid;
            $due_invoice->amount = (double)$invoiceData->amount;
            $due_invoice->comment = (string)$invoiceData->comment;
            $due_invoice->save();

            DB::commit();
            return (object)[
                'uuid' => $due_invoice->refresh()->uuid,
                'code' => $due_invoice->code,
            ];
        }

        return false;
    }
}
