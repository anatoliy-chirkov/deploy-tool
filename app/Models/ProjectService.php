<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProjectService
 * @package App
 * @property int $id
 * @property int $project_id
 * @property int $service_id
 * @property string $key
 * @property string $status
 * @property boolean $has_unapplied_changes
 * @property boolean $configured
 * 
 * @property Service $service
 * @property Project $project
 * @property Collection $envVars
 * @property Collection $volumes
 */
class ProjectService extends Model
{
    protected $fillable = ['project_id', 'service_id', 'key', 'status', 'has_unapplied_changes', 'configured'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function envVars()
    {
        return $this->hasMany(ProjectServiceEnvVar::class);
    }

    public function volumes()
    {
        return $this->hasMany(ProjectServiceVolume::class);
    }
}
