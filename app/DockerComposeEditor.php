<?php

namespace App;

use App\Models\Project;
use App\Models\ProjectService;

class DockerComposeEditor
{
    private $project;
    private $dockerComposeArray;
    private $projectConfigPath;

    public function __construct(Project $project)
    {
        $this->project = $project;
        $this->dockerComposeArray = unserialize($project->serialized_config);
        $this->projectConfigPath = $project->config_path;
    } 

    public function addService(ProjectService $projectService)
    {
        $this->dockerComposeArray['services'][$projectService->key] = [];

        if ($projectService->service->build !== null) {
            $this->dockerComposeArray['services'][$projectService->key]['build'] = $projectService->service->build;
        } else {
            $this->dockerComposeArray['services'][$projectService->key]['image'] = $projectService->service->image;
        }

        foreach ($projectService->volumes as $volume) {
            $this->dockerComposeArray['services'][$projectService->key]['volumes'][] 
                = "{$volume->local_path}:{$volume->container_path}"
            ;
        }

        foreach ($projectService->envVars as $var) {
            $this->dockerComposeArray['services'][$projectService->key]['environment'][$var->var->var] = $var->value;
        }

        $this->dockerComposeArray['services'][$projectService->key]['restart'] = 'always';
        $this->dockerComposeArray['services'][$projectService->key]['tty'] = true;
        $this->dockerComposeArray['services'][$projectService->key]['networks'] = ['general'];

        return $this;
    }

    public function removeService(ProjectService $projectService)
    {
        unset($this->dockerComposeArray['services'][$projectService->key]);

        return $this;
    }

    public function save()
    {
        if ($this->project->serialized_config !== serialize($this->dockerComposeArray)) {
            $this->project->serialized_config = serialize($this->dockerComposeArray);
            $this->project->save();
        }

        $data = yaml_emit($this->dockerComposeArray);
        $data = str_replace("---\n", '', $data);
        $data = str_replace("...\n", '', $data);

        file_put_contents($this->projectConfigPath.'/docker-compose.yml', $data);
    }
}
