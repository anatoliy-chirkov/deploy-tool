<?php

namespace App\Http\Middleware;

use App\Models\UserToken;
use Closure;

class CheckHeaderToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $bearerToken = $request->bearerToken();

        if (empty($bearerToken) || UserToken::query()->where('token', $bearerToken)->first() === null) {
            return response()->json([
                'status' => 'error',
                'error' => [
                    'message' => 'You are not authorized',
                    'stack' => null,
                ],
                'data' => null,
            ], 403);
        }

        return $next($request);
    }
}
