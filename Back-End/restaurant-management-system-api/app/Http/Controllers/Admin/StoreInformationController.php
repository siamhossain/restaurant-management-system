<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use App\Models\StoreInformation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StoreInformationController extends Controller
{
    public function index()
    {
        try {
            $store_information = StoreInformation::first();
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Store Information'), $store_information);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function save(Request $request)
    {
        try {
            $uuid = (string)$request->input('uuid');

            $checkExistence = StoreInformation::where('uuid', '=', $uuid);

            if ($checkExistence->exists()) {
                $store_information = $checkExistence->first();
            } else {
                $store_information = new StoreInformation();
            }

            $store_information->name = (string)$request->input('name');
            $store_information->slogan = (string)$request->input('slogan');
            $store_information->about = (string)$request->input('about');
            $store_information->logo_uri = (string)$request->input('logo_uri');
            $store_information->banner_uri = (string)$request->input('banner_uri');
            $store_information->website = (string)$request->input('website');
            $store_information->email = (string)$request->input('email');
            $store_information->phone_1 = (string)$request->input('phone_1');
            $store_information->phone_2 = (string)$request->input('phone_2');
            $store_information->address_one = (string)$request->input('address_one');
            $store_information->address_two = (string)$request->input('address_two');
            $store_information->address_three = (string)$request->input('address_three');
            $store_information->division_id = $request->input('division_id');
            $store_information->district_id = $request->input('district_id');
            $store_information->upazila_id = $request->input('upazila_id');
            $store_information->zip_code = (string)$request->input('zip_code');
            $store_information->post_office = (string)$request->input('post_office');
            $store_information->save();

            if ($uuid != null) {
                return Endpoint::endWith(true, 'Restaurant Information Update Successfully!');
            }

            return Endpoint::endWith(true, 'Restaurant Information Save Successfully!');

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getDivisions()
    {
        try {
            $sql = "SELECT * FROM divisions";
            $divisions = DB::select($sql);
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Divisions'), $divisions);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getDistricts(Request $request)
    {
        try {
            $division_id = $request->input('division_id');
            $sql = "SELECT * FROM districts WHERE division_id = '{$division_id}'";

            $districts = DB::select($sql);
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Districts'), $districts);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    public function getUpazilas(Request $request)
    {
        try {
            $district_id = $request->input('district_id');
            $sql = "SELECT * FROM upazilas WHERE district_id = '{$district_id}'";

            $upazilas = DB::select($sql);
            return Endpoint::endWith(true, Endpoint::fetchedMessage('Upazila'), $upazilas);
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
