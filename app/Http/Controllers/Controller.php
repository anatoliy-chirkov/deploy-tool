<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    private $user = null;

    protected function user(Request $request)
    {
        if ($this->user === null) {
            $this->user = User::findByToken($request->bearerToken());
        }

        return $this->user;
    }

    protected function success($data = null, int $code = 200)
    {
        return response()->json([
            'status' => 'ok',
            'error' => null,
            'data' => $data,
        ], $code);
    }

    protected function error(string $errorMessage = 'Logical error', $errorStack = null, int $code = 422)
    {
        return response()->json([
            'status' => 'error',
            'error' => [
                'message' => $errorMessage,
                'stack' => $errorStack,
            ],
            'data' => null,
        ], $code);
    }
}
