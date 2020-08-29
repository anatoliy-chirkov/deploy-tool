<?php

namespace App\Jobs;

use App\DockerComposeEditor;
use App\Models\ProjectService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PublishProjectServiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function handle()
    {
        $dockerComposeEditor = new DockerComposeEditor($this->projectService->project);
        $dockerComposeEditor->removeService($this->projectService)
            ->addService($this->projectService)->save()
        ;

        $this->projectService->has_unapplied_changes = false;
        $this->projectService->save();

        // TODO: if project and container running - refresh
    }
}
