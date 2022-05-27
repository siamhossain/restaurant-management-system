<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocialLinkController extends Controller
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

            $social_links = SocialLink::where('is_deleted', '=', 0)->when(trim($search_query) !== "", function ($q) use ($search_query) {
                return $q->where('name', 'LIKE', '%' . $search_query . '%')
                    ->orWhere('code', 'LIKE', '%' . $search_query . '%');
            });

            $TotalRows = $social_links->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $social_links = $social_links->skip($Offset)->take($RowsPerPage)->get();


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
     * For Data Store in Database
     * @param Request $request
     * @return SocialLink|string
     */

    public function save(Request $request)
    {
        try {
            DB::beginTransaction();
            $uuid = (string)$request->input('uuid');
            if ($uuid != null) {
                $social_link = SocialLink::where('uuid', '=', $uuid)->first();
            } else {
                $social_link = new SocialLink();
            }

            $social_link->name = (string)$request->input('name');
            $social_link->icon_uri = (string)$request->input('icon_uri');
            $social_link->website_url = (string)$request->input('website_url');
            $social_link->save();

            DB::commit();

            if ($uuid != null) {
                return Endpoint::endWith(true, Endpoint::updatedMessage("Social Link"));
            } else {
                return Endpoint::endWith(true, Endpoint::savedMessage("Social Link"));
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
            $uuid = (string)$request->input('uuid');
            $force = (int)$request->input('force');

            if ($force === 1) {
                SocialLink::where('uuid', '=', $uuid)->delete();
            } else {
                $brand = SocialLink::where('uuid', '=', $uuid)->first();
                $brand->is_deleted = 1;
//                $brand->deleted_by_uuid = auth()->user()->uuid;
                $brand->deleted_at = date('Y-m-d H:i:s', time());
                $brand->save();
            }
            return Endpoint::endWith(true, Endpoint::deletedMessage('Social Link'));
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

}
