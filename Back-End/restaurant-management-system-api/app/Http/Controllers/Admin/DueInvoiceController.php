<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\DueInvoiceHandler;
use App\Http\Controllers\Controller;
use App\Models\Due;
use App\Models\StoreInformation;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class DueInvoiceController extends Controller
{
    public function index(Request $request)
    {
        try {

            //return $request->all();

            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');
            $participant_type = (string)$request->input('participant_type');

            $due_invoices = Due::where('is_deleted', '=', 0)
                ->when(trim($participant_type) !== "", function ($q) use ($participant_type) {
                    return $q->where('participant_type', '=', $participant_type);
                })
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('comment', 'LIKE', '%' . $search_query . '%');
                })
                ->with('customer')->with('supplier');

            $TotalRows = $due_invoices->count();

            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $due_invoices = $due_invoices->skip($Offset)->take($RowsPerPage)->with('customer')->with('supplier')->get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Due Invoice"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $due_invoices,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {

        try {
            $uuid = (string)$request->input('uuid');
            DueInvoiceHandler::createOrUpdateInvoice([
                'uuid' => $uuid,
                'code' => '',
                'comment' => $request->input('comment'),
                'date' => $request->input('date'),
                'is_auto_entry' => false,
                'participant_type' => $request->input('participant_type'),
                'participant_uuid' => $request->input('participant_uuid'),
                'amount' => (double)$request->input('amount'),
            ]);

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage('Due'));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage('Due'));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function invoiceSummary(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $uuid = $request->input('uuid');
            $type = $request->input('type');
            $total_amount = 0;
            $total_due = 0;

            $invoice_summary = Due::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59']);

            if ($type === 'Customer') {
                $invoice_summary = $invoice_summary->where('participant_type', '=', $type)->with('customer');
                if ($uuid != "") {
                    $invoice_summary = $invoice_summary->where('participant_uuid', '=', $uuid);
                }
                if ($user_uuid != "") {
                    $invoice_summary = $invoice_summary->where('created_by_uuid', '=', $user_uuid);
                }
            }

            if ($type === 'Supplier') {
                $invoice_summary = $invoice_summary->where('participant_type', '=', $type)->with('supplier');
                if ($uuid != "") {
                    $invoice_summary = $invoice_summary->where('participant_uuid', '=', $uuid);
                }
                if ($user_uuid != "") {
                    $invoice_summary = $invoice_summary->where('created_by_uuid', '=', $user_uuid);
                }
            }



            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $invoice_summary = $invoice_summary->get();

            foreach ($invoice_summary as $payment) {
                $total_amount = $total_amount + $payment->amount;
            }
            $store_info = StoreInformation::first();
//            return $invoice_summary;

            return view('reports.invoice_summary.invoice_summary', compact('invoice_summary', 'from_date', 'to_date', 'total_amount', 'total_due', 'store_info', 'user', 'type'));
        } catch (Exception $exception) {
            return $exception;
        }
    }


    /**
     * For Data Delete
     * @param Request $request
     * @return JsonResponse|string
     */
    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                Due::where('uuid', '=', $uuid)->delete();
            } else {
                $category = Due::where('uuid', '=', $uuid)->first();
                $category->is_deleted = 1;
                $category->deleted_by_uuid = auth()->user()->uuid;
                $category->deleted_at = date ('Y-m-d H:i:s', time());
                $category->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage("Due Invoice"));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
