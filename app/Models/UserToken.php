<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UserToken
 * @package App
 * @property int $id
 * @property int $user_id
 * @property string $token
 * @property string $created_at
 */
class UserToken extends Model
{
    public $timestamps = false;
    protected $fillable = ['user_id', 'token'];

    public static function generate(int $userId): self
    {
        return self::query()->create([
            'user_id' => $userId,
            'token' => self::generateToken($userId),
        ]);
    }

    private static function generateToken(int $userId): string
    {
        return hash('sha256', $userId . now());
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
