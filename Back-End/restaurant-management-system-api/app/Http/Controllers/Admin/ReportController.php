<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\AccountingHistory;
use App\Models\CashSummary;
use App\Models\StoreInformation;
use Exception;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function handBalance(Request $request)
    {
        try {
            $date = $request->input('date');
            $total_income = AccountingHistory::where('type', '=', 'Income')->where('date', '=', $date)->sum('total_amount');
            $total_expense = AccountingHistory::where('type', '=', 'Expense')->where('date', '=', $date)->sum('total_amount');
            $opening_balance = CashSummary::where('date', '=', $date)->sum('opening_balance');

            if ((double)$total_income > (double)$total_expense) {
                $hand_balance = ((double)$total_income + (double)$opening_balance) - (double)$total_expense;
            } else {
                $hand_balance = 0;
            }


            return Endpoint::endWith(true, Endpoint::fetchedMessage('Hand Balance'), [
                'total_income' => $total_income,
                'total_expense' => $total_expense,
                'hand_balance' => $hand_balance,
                'opening_balance' => $opening_balance,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function incomeBalanceSheet(Request $request)
    {
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');
        $dates = Helper::createDateRangeArray($from_date . " 00:00:00", $to_date . " 23:59:59");
        $store_info = StoreInformation::first();
        return view('reports.income_balance_sheet.income_balance_sheet', compact('dates', 'from_date', 'to_date', 'store_info'));
    }
}
