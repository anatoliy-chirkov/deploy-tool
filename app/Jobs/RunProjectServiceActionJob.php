<?php

namespace App\Jobs;

use App\Models\ProjectService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RunProjectServiceActionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $projectService;
    private $action;

    public function __construct(ProjectService $projectService, string $action)
    {
        $this->projectService = $projectService;
        $this->action = $action;
    }

    public function handle()
    {
        exec("docker {$this->projectService->key} {$this->action}");

        // TODO: catch output & change project status
    }
}
