<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceEnvVar
 * @package App
 * @property int $id
 * @property int $service_id
 * @property string $var
 * @property string $name
 * @property string|null $description
 */
class ServiceEnvVar extends Model
{
    protected $fillable = ['service_id', 'var', 'name', 'description'];
}
