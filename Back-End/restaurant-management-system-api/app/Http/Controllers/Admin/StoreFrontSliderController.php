<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\StoreFrontSlide;
use App\Models\StoreFrontSlider;
use Exception;
use Illuminate\Http\Request;

class StoreFrontSliderController extends Controller
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

            $front_slides = StoreFrontSlider::when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%');
            })->where('is_deleted', '=', 0);

            $TotalRows = $front_slides->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $front_slides = $front_slides->skip($Offset)->take($RowsPerPage)->get();


            return Endpoint::endWith(true, Endpoint::fetchedMessage("Store Front Slides"), [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $front_slides,
            ]);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }


    /**
     * For Data Store in Database
     * @param Request $request
     * @return StoreFrontSlide|string
     */

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');
            if ($uuid != null) {
                $front_slide = StoreFrontSlider::where('uuid', '=', $uuid)->first();
//                $front_slide->updated_by_uuid = auth()->user()->uuid;
            } else {
                $front_slide = new StoreFrontSlider();
//                $front_slide->created_by_uuid = auth()->user()->uuid;
            }

            $front_slide->image_uri = (string)$request->input('image_uri');
            $front_slide->description_text_color = (string)$request->input('description_text_color');
            $front_slide->is_featured = (int) $request->input('is_featured');
            $front_slide->description = (string)$request->input('description');
            $front_slide->save();

            if ($uuid != null){
                return Endpoint::endWith(true, Endpoint::updatedMessage("Slide"));
            }else{
                return Endpoint::endWith(true, Endpoint::savedMessage("Slide"));
            }

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
            $uuid = (string) $request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                StoreFrontSlider::where('uuid', '=', $uuid)->delete();
            } else {
                $front_slide = StoreFrontSlider::where('uuid', '=', $uuid)->first();
                $front_slide->is_deleted = 1;
                $front_slide->deleted_at = date('Y-m-d H:i:s', time());
//                $front_slide->deleted_by_uuid = auth()->user()->uuid;
                $front_slide->save();
            }

            return Endpoint::endWith(true, Endpoint::deletedMessage('StoreFrontSlider'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
