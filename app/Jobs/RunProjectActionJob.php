<?php

namespace App\Jobs;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RunProjectActionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public const
        ACTION_START = 'start',
        ACTION_REFRESH = 'refresh',
        ACTION_STOP = 'stop'
    ;

    private $project;
    private $action;

    public function __construct(Project $project, string $action)
    {
        $this->action = $action;
        $this->project = $project;
    }

    public function handle()
    {
        switch ($this->action) {
            case self::ACTION_START:
            case self::ACTION_REFRESH:
                $command = 'up -d';
            break;
            case self::ACTION_STOP:
                $command = 'down';
            break;
            default:
                return;
        }

        exec("cd {$this->project->path} && docker-compose {$command}");

        // TODO: catch output & change project status
    }
}
