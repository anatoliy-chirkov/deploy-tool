<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserToken;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private $hasher;

    public function __construct()
    {
        $this->hasher = new BcryptHasher();
    }

    public function me(Request $request)
    {    
        return $this->success([
            'token' => $request->bearerToken(),
            'user_id' => $this->user($request)->id,
        ]);
    }

    public function signIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $user = User::query()->select('id', 'password')
            ->where('name', $request->post('name'))
            ->first()
        ;

        if ($user === null) {
            return $this->error('User doesn\'t exist', $validator->errors(), 403);
        }

        if (!$this->hasher->check($request->post('password'), $user->password)) {
            return $this->error('Password isn\'t correct', $validator->errors(), 403);
        }

        $userToken = UserToken::generate($user->id);

        return $this->success([
            'token' => $userToken->token,
            'user_id' => $user->id,
        ]);
    }

    public function signOut(Request $request)
    {
        $userToken = UserToken::query()->where('token', $request->bearerToken())->first();
        $userToken->delete();

        return $this->success(null, 204);
    }
}
