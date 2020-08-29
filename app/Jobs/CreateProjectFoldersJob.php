<?php

namespace App\Jobs;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateProjectFoldersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $project;

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function handle()
    {
        if (!file_exists($this->project->config_path)) {
            mkdir($this->project->config_path, 0755, true);
        }

        if (!file_exists($this->project->path)) {
            mkdir($this->project->path, 0755, true);
        }
    }
}
