<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProjectServiceEnvVar
 * @package App
 * @property int $id
 * @property int $project_service_id
 * @property int $service_env_var_id
 * @property string|null $value
 * 
 * @property ProjectService $projectService
 * @property ServiceEnvVar $var
 */
class ProjectServiceEnvVar extends Model
{
    protected $fillable = ['project_service_id', 'service_env_var_id', 'value'];

    public function projectService()
    {
        return $this->belongsTo(ProjectService::class);
    }

    public function var()
    {
        return $this->belongsTo(ServiceEnvVar::class, 'service_env_var_id', 'id');
    }
}
