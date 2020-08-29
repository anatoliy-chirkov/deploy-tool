<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceConfigFile
 * @package App
 * @property int $id
 * @property int $service_id
 * @property string $path_to_default
 * @property string $container_path
 */
class ServiceConfigFile extends Model
{
    protected $fillable = ['service_id', 'path_to_default', 'container_path'];
}
