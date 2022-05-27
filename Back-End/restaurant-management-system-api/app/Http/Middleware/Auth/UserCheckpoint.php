<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Endpoint;
use Closure;
use Illuminate\Http\Request;

class UserCheckpoint
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $auth_user = auth()->user();

        if((string)$auth_user->status === "Inactive") {
            return Endpoint::endWith(false, "Your account is inactive!", null, "ERR_USER_INACTIVE", 401);
        }

        if((string)$auth_user->status === "Banned") {
            return Endpoint::endWith(false, "Your account was banned!", null, "ERR_USER_BANNED", 401);
        }

        return $next($request);
    }
}
