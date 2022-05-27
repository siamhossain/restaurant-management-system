<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\BookingFoodList;
use App\Models\TableBooking;
use Exception;
use Illuminate\Http\Request;

class TableBookingController extends Controller
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

            $social_links = TableBooking::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $social_links->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $social_links = $social_links->skip($Offset)->take($RowsPerPage)->with('booking_food_list')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Social Links"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $social_links,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

 /**
     * For Data Table Grid
     * @param Request $request
     * @return string
     */
    public function tableBookingForKitchen(Request $request)
    {
        try {
            $RowsPerPage = (int)$request->input('RowsPerPage');
            $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
            $search_query = (string)$request->input('search_query');

            $social_links = TableBooking::where('is_deleted', '=', 0)->where('status', '=', 'Accept')->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $social_links->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $social_links = $social_links->skip($Offset)->take($RowsPerPage)->with('booking_food_list')->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Social Links"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $social_links,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
//        return $request->all();
        try {
            $uuid = $request->input('uuid');
            $existTable = TableBooking::where('uuid', '=', $uuid);
            $food_list = $request->input('booking_food_list');

            if ($existTable->exists()) {
                $table_book = $existTable->first();
//                $table_book->updated_at = auth()->user()->uuid;
            } else {
                $table_book = new TableBooking();
                $module_code = UAP::$MODULES['BOOKING']['Code'];
                $prefix = UAP::$MODULES['BOOKING']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
//                $table_book->created_at = auth()->user()->uuid;
                $table_book->code = $generated_doc_code;
                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $table_book->name = (string)$request->input('name');
            $table_book->email = (string)$request->input('email');
            $table_book->phone = (string)$request->input('phone');
            $table_book->date = (string)$request->input('date');
            $table_book->time = (string)$request->input('time');
            $table_book->occasion = (string)$request->input('occasion');
            $table_book->person = (int)$request->input('person');
            $table_book->status = (string)$request->input('status');
            $table_book->message = (string)$request->input('message');
            $table_book->customer_uuid = (string)$request->input('customer_uuid');
            $table_book->save();

            $booking_uuid = $table_book->refresh()->uuid;
            if ($table_book->save()) {
                BookingFoodList::where('booking_uuid', '=', $booking_uuid)->delete();

                foreach ($food_list as $food) {
                    $food_item = new BookingFoodList();
                    $food_item->booking_uuid = $booking_uuid;
                    $food_item->category_name = $food['category_name'];
                    $food_item->food_uuid = $food['food_uuid'];
                    $food_item->food_category_uuid = $food['food_category_uuid'];
                    $food_item->food_name = $food['food_name'];
                    $food_item->quantity = $food['quantity'];
                    $food_item->price = $food['price'];
                    $food_item->total_price = $food['total_price'];
                    $food_item->save();

                }
            }

            if ($uuid !== "") {
                return Endpoint::endWith(true, Endpoint::updatedMessage('Table Book'));
            }
            return Endpoint::endWith(true, Endpoint::savedMessage('Table Book'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function statusUpdate(Request $request)
    {
        try {

            $uuid = (string)$request->input('uuid');
            $status = (string)$request->input('status');

            $booking = TableBooking::where('uuid', '=', $uuid)->first();

            if ((string)$status !== '') {
                $booking->status = $request->input('status');
            }

            $booking->save();

            if ( $booking->save()) {
                if ($status === "Accept") {
                    $food_list = BookingFoodList::where('booking_uuid', '=', $uuid)->get();

                    foreach ($food_list as $food) {
                        $food_status = BookingFoodList::where('uuid', '=', $food->uuid)->first();
                        $food_status->status = 'Inprogress';
                        $food_status->save();
                    }

                }
            }

            return Endpoint::endWith(true, 'Booking ' . $status . ' Successfully');

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function foodStatusUpdateByKitchen(Request $request) {
        try {
            $uuid = $request->input('uuid');
            $status = $request->input('status');
            $food_list = BookingFoodList::where('uuid', '=', $uuid)->first();
            $food_list->status = $status;
            $food_list->save();

            return Endpoint::endWith(true, Endpoint::updatedMessage('Food'));
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
                TableBooking::where('id', '=', $uuid)->delete();
            } else {
                $booking = TableBooking::where('uuid', '=', $uuid)->first();
                $booking->is_deleted = 1;
                $booking->deleted_by_uuid = auth()->user()->uuid;
                $booking->deleted_at = date('Y-m-d H:i:s', time());
                $booking->save();
            }


            return Endpoint::endWith(true, Endpoint::deletedMessage('Table Booking'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


}
