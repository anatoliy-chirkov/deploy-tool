<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProjectServiceVolume
 * @package App
 * @property int $id
 * @property int $project_service_id
 * @property string $local_path
 * @property string $container_path
 * 
 * @property ProjectService $projectService
 */
class ProjectServiceVolume extends Model
{
    protected $fillable = ['project_service_id', 'local_path', 'container_path'];

    public function projectService()
    {
        return $this->belongsTo(ProjectService::class);
    }
}
