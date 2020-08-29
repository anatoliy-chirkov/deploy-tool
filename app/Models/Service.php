<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Service
 * @package App
 * @property int $id
 * @property string $name
 * @property string $version
 * @property string|null $description
 * @property string|null $image
 * @property string|null $build
 * @property string|null $cache_path
 * @property string|null $work_path
 * 
 * @property string $slug
 * @property Collection $envVars
 * @property ServiceConfigFile|null $configFile
 */
class Service extends Model
{
    protected $fillable = ['name', 'version', 'description', 'image', 'build', 'cache_path', 'work_path'];

    public function envVars()
    {
        return $this->hasMany(ServiceEnvVar::class);
    }

    public function configFile()
    {
        return $this->hasOne(ServiceConfigFile::class);
    }

    public function getSlugAttribute()
    {
        return str_slug($this->name.' '.$this->version);
    }
}
