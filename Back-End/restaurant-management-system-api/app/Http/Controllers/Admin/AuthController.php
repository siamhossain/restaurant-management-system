<?php

namespace App\Http\Controllers\Admin;

use App\Features\UAP;
use App\Helpers\Endpoint;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Try to attempt the authentication
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attempt(Request $request)
    {
        try {
            $credentials = $request->only(['username', 'password']);

            if (!$token = auth()->attempt($credentials)) {
                return Endpoint::endWith(false, "Your username or password was incorrect!", ["token" => null]);
            }

            $auth_user = auth()->user();

            if ($auth_user->status === "Inactive") {
                return Endpoint::endWith(false, "Your account is inactive!");
            }

            if ($auth_user->status === "Banned") {
                return Endpoint::endWith(false, "Your account was banned!");
            }

            return Endpoint::endWith(true, "Authentication Successful!", ["token" => $token]);

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }

    /**
     * Try to logout the user and invalidate the token
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $token = $request->header('Authorization');

        try {
            if (JWTAuth::parseToken()->invalidate($token)) {
                return Endpoint::endWith(true, "Logout successful!");
            }
        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }

        return Endpoint::endWith(false, "Failed to logout!");
    }

    public function authUser()
    {
        try {
            $authUser = auth()->user();
            $authUser->modules = UAP::getRolePermissions($authUser->role_id);

            return Endpoint::endWith(true, Endpoint::fetchedMessage("Auth User"), ['user' => $authUser]);

        } catch (Exception $exception) {
            return Endpoint::endWithException($exception);
        }
    }
}
