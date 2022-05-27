<?php

namespace App\Http\Controllers\Admin;

use App\CDN\CDN;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;

class UploadController extends Controller
{
    /**
     * Upload a file and get a response of the target directory path direction
     * @param Request $request
     * @param string $folder
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        if ($request->hasfile('file')) {
            try {
                $directory = $request->input("dir");

                if ($directory == "") {
                    $directory = "";
                }

                if ($directory == "customer") {
                    $directory = "customers/";
                }

                if ($directory == "supplier") {
                    $directory = "suppliers/";
                }

                if ($directory == "product") {
                    $directory = "products/";
                }
                if ($directory == "category") {
                    $directory = "categories/";
                }

                if ($directory == "brand") {
                    $directory = "brands/";
                }
                if ($directory == "social") {
                    $directory = "social/";
                }
                if ($directory == "store") {
                    $directory = "store/";
                }
                if ($directory == "ingredient_purchase_summary") {
                    $directory = "ingredient_purchase_summary/";
                }

                $file = $request->file('file');
                $_file = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $_file = 'public/uploads/' . $directory . $_file;
                Storage::disk('s3')->put(CDN::$PATHS['ROOT'] . $_file, file_get_contents($file));
                return Endpoint::endWith(true, 'Uploaded successfully!', ['path' => $_file]);
            } catch (Exception $exception) {
                return Endpoint::endWithException($exception);
            }
        }

        return Endpoint::endWith(false, 'Please Select a File!');
    }
}
