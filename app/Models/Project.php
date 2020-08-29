<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Project
 * @package App
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $path
 * @property string $serialized_config
 * @property string $status
 * 
 * @property string $config_path
 * @property Collection $services
 */
class Project extends Model
{
    public const 
        STATUS_RUNNING = 'running',
        STATUS_STOPPED = 'stopped',
        STATUS_UNACTIVE = 'unactive'
    ;

    protected $fillable = ['name', 'slug', 'path', 'config_path', 'serialized_config', 'status'];

    public function services()
    {
        return $this->hasMany(ProjectService::class);
    }

    public function getConfigPathAttribute()
    {
        return base_path('projects').'/'.$this->slug;
    }

    public static function getDockerComposeSerializedTemplate()
    {
        return serialize([
            'version' => '3.3',
            'networks' => [
                'general' => [
                    'external' => [
                        'name' => 'deploytool_general',
                    ]
                ],
            ],
            'services' => [],
        ]);
    }
}
