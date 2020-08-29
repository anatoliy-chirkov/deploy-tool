<?php

namespace App\Models;

use Faker\Provider\DateTime;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 * @package App
 * @property int $id
 * @property string $name
 * @property string $password
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = ['name', 'password'];

    public static function findByToken(string $token): ?User
    {
        $userToken = UserToken::query()->where('token', $token)->first();
        return $userToken === null ? null : $userToken->user;
    }
}
