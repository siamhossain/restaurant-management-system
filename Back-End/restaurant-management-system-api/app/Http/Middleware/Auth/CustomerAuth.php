<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Endpoint;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CustomerAuth
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        try {
            /**
             * Redirect the user to the expected request
             */
            if (auth()->guard('customer')->check()) {
                //Continue to the request
                return $next($request);
            }


            if (!$token = JWTAuth::parseToken()) {
                //throw an exception

                return Endpoint::endWith(false, "You are not authenticated!", null, 'ERR_UNAUTHORIZED', 401);
            }
        } catch (\Exception $e) {
            if ($e instanceof TokenInvalidException) {
                //throw an exception
                return Endpoint::endWith(false, "Your auth token was invalid!", null, 'ERR_INVALID_TOKEN', 401);

            } else if ($e instanceof TokenExpiredException) {
                //throw an exception
                return Endpoint::endWith(false, "Your auth token has been expired!", null, 'ERR_TOKEN_EXPIRED', 401);
            } else if ($e instanceof TokenBlacklistedException) {
                //throw an exception
                return Endpoint::endWith(false, "Your auth token was blacklisted!", null, 'ERR_TOKEN_BLACKLISTED', 401);
            } else if ($e instanceof JWTException) {
                //throw an exception
                return Endpoint::endWith(false, $e->getMessage(), null, 'ERR_JWT_ERROR', 401);
            } else {
                //throw an exception
                return Endpoint::endWith(false, $e->getMessage(), null, 'ERR_UNAUTHORIZED', 401);
            }
        }

        return Endpoint::endWith(false, "You are not authenticated!", null, 'ERR_UNAUTHORIZED', 401);
    }
}
