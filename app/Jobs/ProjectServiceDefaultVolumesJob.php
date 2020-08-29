<?php

namespace App\Jobs;

use App\Models\ProjectService;
use App\Models\ProjectServiceVolume;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProjectServiceDefaultVolumesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $projectService;
    private $service;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
        $this->service = $projectService->service;
    }

    public function handle()
    {
        if ($this->service->configFile !== null) {
            $this->createConfigVolume();
        }

        if ($this->service->cache_path !== null) {
            $this->createCacheVolume();
        }

        if ($this->service->work_path !== null) {
            $this->createWorkdirVolume();
        }
    }

    private function createCacheVolume()
    {
        $this->insertVolume(
            $this->projectService->project->config_path."/cache/{$this->service->slug}",
            $this->service->cache_path
        );
    }

    private function createWorkdirVolume()
    {
        $this->insertVolume(
            $this->projectService->project->path,
            $this->service->work_path
        );
    }

    private function createConfigVolume()
    {
        $localConfigFolder = $this->projectService->project->config_path."/config/{$this->service->slug}";

        if (!file_exists($localConfigFolder)) {
            mkdir($localConfigFolder, 0777, true);
        }

        $pathToDefault = $this->service->configFile->path_to_default;

        if ($pathToDefault !== null) {
            preg_match('/\/([\w]+.[\w]+$)/', $pathToDefault, $fileName);
            $localConfigPath = $localConfigFolder.'/'.$fileName[1];
            copy($pathToDefault, $localConfigPath);
        } else {
            $localConfigPath = $localConfigFolder.'/';
        }

        $this->insertVolume($localConfigPath, $this->service->configFile->container_path);
    }

    private function insertVolume(string $localPath, string $containerPath)
    {
        ProjectServiceVolume::query()->create([
            'project_service_id' => $this->projectService->id,
            'local_path' => $localPath,
            'container_path' => $containerPath,
        ]);
    }
}
