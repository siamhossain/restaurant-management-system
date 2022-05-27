<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Admin\Classes\AccountingHandler;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StoreInformation;
use App\Models\User;
use App\Models\Wastage;
use App\Models\WastageParticular;
use Exception;
use Illuminate\Http\Request;

class WastageController extends Controller
{
    public function index(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $wastages = Wastage::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('title', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search_query . '%');
            })->with('particulars');


            $TotalRows = $wastages->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $wastages = $wastages->skip($Offset)->take($RowsPerPage)->get();

            return Endpoint::endWith(true, Endpoint::fetchedMessage('Wastage Orders'), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $wastages,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function wastageForDropdown()
    {
        try {
            $wastages = Wastage::where('is_deleted', '=', 0)->get();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Wastage Order'), $wastages);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function generateParticulars(Request $request)
    {
        try {
            $product_uuid = (string)$request->input('product_uuid');
            $particulars = [];

            $products = Product::where('uuid', $product_uuid)->with('media')->get();

            foreach ($products as $product) {
                array_push($particulars, [
                    'id' => 0,
                    'product_code' => $product->code,
                    'product_uuid' => $product->uuid,
                    'products_media' => $product->media,
                    'sales_order_uuid' => '',
                    'product_name' => $product->title,
                    'quantity' => 0,
                    'unit_price' => (double)$product->sales_price,
                    'discount' => 0,
                    'total_amount' => 0,

                ]);
            }

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Wastage order particulars"), [
                'particulars' => $particulars,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $particulars = $request->input('particulars');

            if ($uuid != null) {
                $wastage = Wastage::where('uuid', '=', $uuid)->first();
//                $wastage->updated_by_uuid = auth()->user()->uuid;
            } else {
                $wastage = new Wastage();
//                $wastage->created_by_uuid = auth()->user()->uuid;

                $module_code = UAP::$MODULES['WASTAGE']['Code'];
                $prefix = UAP::$MODULES['WASTAGE']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $wastage->code = $generated_doc_code;

                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $wastage->date = (string)$request->input('date');
            $wastage->total_amount = (double)$request->input('total_amount');
            $wastage->save();

            $wastage_uuid = $wastage->refresh()->uuid;
            if ($wastage->save()) {
                WastageParticular::where('wastage_uuid', '=', $wastage_uuid)->delete();

                foreach ($particulars as $particular) {
                    $wastage_particular = new WastageParticular();
                    $wastage_particular->wastage_uuid = (string)$wastage_uuid;
                    $wastage_particular->product_uuid = (string)$particular['product_uuid'];
                    $wastage_particular->product_title = (string)$particular['product_name'];
                    $wastage_particular->qty = (string)$particular['qty'];
                    $wastage_particular->unit_price = (string)$particular['unit_price'];
                    $wastage_particular->discount = (string)$particular['discount'];
                    $wastage_particular->total_amount = (string)$particular['total_amount'];
                   $wastage_particular->save();
                }

            }

            if (AccountingHandler::autoEntryEnabled()) {
                $accounting_settings = AccountingHandler::getSettings('cash_purchase');
                AccountingHandler::makeEntry([
                    'uuid' => '',
                    'is_auto_entry' => 1,
                    'comment' => $wastage->code,
                    'account_category_uuid' => $accounting_settings->account_category_uuid,
                    'account_category_name' => $accounting_settings->account_category_name,
                    'account_head_uuid' => $accounting_settings->account_head_uuid,
                    'account_head_name' => $accounting_settings->account_head_name,
                    'type' => 'Expense',
                    'total_amount' => $wastage->total_amount,
                    'date' => $wastage->date,
                ]);
            }

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage('Wastage'));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage('Wastage'));
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function delete(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                Wastage::where('uuid', '=', $uuid)->delete();
                WastageParticular::where('wastage_uuid', '=', $uuid)->delete();
            } else {
                $wastage = Wastage::where('uuid', '=', $uuid)->first();
                $wastage->is_deleted = 1;
//                $wastage->deleted_by_uuid = auth()->user()->uuid;
                $wastage->deleted_at = date('Y-m-d H:i:s', time());
                $wastage->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage('Wastage Order'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function wastageSummary(Request $request)
    {
        try {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $user_uuid = $request->input('user_uuid');
            $total_amount = 0;

            $wastage_summary = Wastage::whereBetween('date', [$from_date . ' 00:00:00', $to_date . ' 23:59:59']);

            if ($user_uuid != "") {
                $wastage_summary = $wastage_summary->where('created_by_uuid', '=', $user_uuid);
            }

            $user = User::where('uuid', '=', $user_uuid)->with('role')->first();

            $wastage_summary = $wastage_summary->get();

            foreach ($wastage_summary as $sales) {
                $total_amount = $total_amount + $sales->total_amount;
            }
            $store_info = StoreInformation::first();
//            return $store_info;

            return view('reports.wastage.wastage_summary', compact('wastage_summary', 'from_date', 'to_date', 'total_amount', 'store_info', 'user'));
        } catch (Exception $exception) {
            return $exception;
        }
    }

    public function wastageReport(Request $request)
    {
        try {
            $uuid = $request->input('uuid');
            if ((string)$uuid === '') {
                return view('errors.NotFoundReport');
            }
            $store_info = StoreInformation::first();
            $wastage = Wastage::where('uuid', '=', $uuid)->first();
            $wastage_particulars = WastageParticular::where('wastage_uuid', '=', $uuid)->get();

            return view('reports.wastage.wastage_report', compact('wastage', 'wastage_particulars', 'store_info'));
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
