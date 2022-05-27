<?php


namespace App\Helpers;


class Endpoint
{
    public static function fetchedMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Fetched Successfully!";
    }

    public static function savedMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Saved Successfully!";
    }

    public static function createdMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Created Successfully!";
    }

    public static function updatedMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Updated Successfully!";
    }

    public static function deletedMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Deleted Successfully!";
    }

    public static function duplicateEntryMessage($messagePrefix = '')
    {
        return (trim($messagePrefix) !== '' ? $messagePrefix . " " : "") . "Already Exists!";
    }

    /**
     * End the a response
     * @param boolean $success
     * @param string $message
     * @param null | array | object $data
     * @param null | string $error_code
     * @param int $status_code
     * @return \Illuminate\Http\JsonResponse
     */
    public static function endWith($success, $message, $data = null, $error_code = null, $status_code = 200)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'error_code' => $error_code,
            'data' => $data,
        ], $status_code);
    }

    public static function endWithException($exception)
    {
        return self::endWith(false, $exception->getMessage(), null, $exception->getCode(), 500);
    }
}
