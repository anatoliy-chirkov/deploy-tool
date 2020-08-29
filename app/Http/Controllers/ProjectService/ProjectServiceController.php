<?php

namespace App\Http\Controllers\ProjectService;

use App\Http\Controllers\Controller;
use App\Jobs\ProjectServiceDefaultVolumesJob;
use App\Jobs\PublishProjectServiceJob;
use App\Jobs\RemoveProjectServiceJob;
use App\Jobs\RunProjectServiceActionJob;
use App\Models\ProjectService;
use App\Models\ProjectServiceEnvVar;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectServiceController extends Controller
{
    public function create(Request $request, int $projectId)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id'
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $service = Service::query()->find($request->post('service_id'));

        $projectService = ProjectService::query()->create([
            'project_id' => $projectId,
            'service_id' => $service->id,
            'key' => md5(time().$projectId),
            'status' => 'unactive',
            'has_unapplied_changes' => true,
            'configured' => false,
        ]);

        foreach ($service->envVars as $envVar) {
            ProjectServiceEnvVar::query()->create([
                'project_service_id' => $projectService->id,
                'service_env_var_id' => $envVar->id,
                'value' => null,
            ]);
        }

        ProjectServiceDefaultVolumesJob::dispatch($projectService);

        return $this->success(array_merge($projectService->getAttributes(), [
            'service' => $projectService->service->getAttributes()
        ]), 201);
    }

    public function delete(Request $request, int $projectId, int $id)
    {
        $projectService = ProjectService::query()->find($id);
        $projectService->envVars->delete();
        $projectService->volumes->delete();

        RemoveProjectServiceJob::dispatch($projectService);

        $projectService->delete();

        return $this->success(null, 204);
    }

    public function run(Request $request, int $projectId, int $id, string $action)
    {
        $projectService = ProjectService::query()->find($id);

        if ($projectService->configured === false) {
            return $this->error('Service must be configured', null, 422);
        }

        if ($action === 'publish') {
            PublishProjectServiceJob::dispatch($projectService);
        } else {
            RunProjectServiceActionJob::dispatch($projectService, $action);
        }

        return $this->success(null, 204);
    }
}
