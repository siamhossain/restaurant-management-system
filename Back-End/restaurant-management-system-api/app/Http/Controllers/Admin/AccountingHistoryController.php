<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\AccountingHistory;
use App\Models\StoreInformation;
use Exception;
use Illuminate\Http\Request;

class AccountingHistoryController extends Controller
{
    /**
     * For Data Table Grid
     * @param Request $request
     * @return string
     */
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');
            $type = (string)$request->input('type');

            $accounting_histories = AccountingHistory::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('comment', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            })->where('type', '=', $type);

            $TotalRows = $accounting_histories->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $accounting_histories = $accounting_histories->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Accounting Histories"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $accounting_histories,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Dropdown Data
     * @param Request $request
     * @return AccountingHistory[]|\Illuminate\Database\Eloquent\Collection|string
     */

    public function accountingHistoryForDropdown(Request $request)
    {
        try {
            $search_query = (string)$request->input('search_query');
            $accounting_historys = AccountingHistory::where('is_deleted', '=', 0)
                ->when(trim($search_query) !== "", function ($q) use ($search_query) {
                    return $q->where('comment', 'LIKE', '%' . $search_query . '%');
                })
                ->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Accounting Histories'), $accounting_historys);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return AccountingHistory|string
     */

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $document_date = $request->input('date');
            $document_date = date('Y/m/d', strtotime($document_date));
            //return $document_date;

            if ($uuid != null) {
                $accounting_history = AccountingHistory::where('uuid', '=', $uuid)->first();
//                $accounting_history->updated_by_uuid = auth()->user()->uuid;
            } else {
                $accounting_history = new AccountingHistory();
                $module_code = UAP::$MODULES['ACCOUNTING_HISTORY']['Code'];
                $prefix = UAP::$MODULES['ACCOUNTING_HISTORY']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $accounting_history->code = $generated_doc_code;
//                $accounting_history->created_by_uuid = auth()->user()->uuid;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }
            $accounting_history->account_category_uuid = (string)$request->input('account_category_uuid');
            $accounting_history->account_category_name = (string)$request->input('account_category_name');
            $accounting_history->account_head_uuid = (string)$request->input('account_head_uuid');
            $accounting_history->account_head_name = (string)$request->input('account_head_name');
            $accounting_history->type = (string)$request->input('type');
            $accounting_history->comment = (string)$request->input('comment');
            $accounting_history->total_amount = (double)$request->input('total_amount');
            $accounting_history->date = $document_date;
            $accounting_history->save();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Accounting History"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Accounting History"));
            }

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getTotalAccountingHistoriesCounted(Request $request)
    {
        try {
            $type = $request->input('type');

            $total_accounting_histories = AccountingHistory::where('is_deleted', '=', 0)
                ->where('type', $type)
                ->where('document_date', '=', date('Y-m-d'))
                ->sum("total_amount");
            return Endpoint::endWith(true, "Fetched the total products counted!", ['total_accounting_histories' => $total_accounting_histories]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * For Data Delete
     * @param Request $request
     * @return string
     */
    public function delete(Request $request)
    {
        try {

            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                AccountingHistory::where('uuid', '=', $uuid)->delete();
            } else {
                $accounting_history = AccountingHistory::where('uuid', '=', $uuid)->first();
                $accounting_history->is_deleted = 1;
                $accounting_history->deleted_by_uuid = auth()->user()->uuid;
                $accounting_history->deleted_at = date('Y-m-d H:i:s', time());
                $accounting_history->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage('AccountingHistory'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function generalLedger(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $total_income = 0;
            $total_expense = 0;

            $ledger_summary = AccountingHistory::whereBetween('date', [$from_date, $to_date])->get();

            foreach ($ledger_summary as $summary) {
                if ($summary->type == "Income") {
                    $total_income = $summary->total_amount + $total_income;
                }

                if ($summary->type == "Expense") {
                    $total_expense = $summary->total_amount + $total_expense;
                }
            }

            $store_info = StoreInformation::first();

            return view('reports.general_ledger.general_ledger', compact('ledger_summary', 'total_expense', 'total_income', 'store_info', 'from_date', 'to_date'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function profitLoss(Request $request)
    {
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');

        $income_list = AccountingHistory::where('type', '=', 'Income')->whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->get();
        $total_income = 0;
        foreach ($income_list as $income) {
            $total_income = $total_income + $income->total_amount;
        }
        $expense_list = AccountingHistory::where('type', '=', 'Expense')->whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59'])->get();
        $total_expense = 0;
        foreach ($expense_list as $expense) {
            $total_expense = $total_expense + $expense->total_amount;
        }
        $loss = 0;
        $profit = 0;
        if ($total_income > $total_expense) {
            $profit = $total_income - $total_expense;
        } else {
            $loss = $total_expense - $total_income;
        }
        $store_info = StoreInformation::first();

        $allData = [
            'total_income' => $total_income,
            'total_expense' => $total_expense,
            'loss' => $loss,
            'profit' => $profit,
            'income_list' => $income_list,
            'expense_list' => $expense_list,
            'store_info' => $store_info,
        ];


        return view('reports.profit_loss.profit_loss', compact('total_income', 'total_expense', 'loss', 'profit', 'income_list', 'expense_list', 'store_info'));
    }

    public function accountingHistory(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $type = $request->input('type');
            $total_amount = 0;

            $accounting_history = AccountingHistory::where('is_deleted', '=', 0)->whereBetween('date', [$from_date, $to_date]);

            if ($type != "") {
                $accounting_history = $accounting_history->where('type', '=', $type);
            }

            $accounting_history = $accounting_history->get();

            $store_info = StoreInformation::first();
            foreach ($accounting_history as $history) {
                $total_amount = $total_amount + $history->total_amount;
            }

            return view('reports.accounting_history.accounting_histories', compact('accounting_history', 'total_amount', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
