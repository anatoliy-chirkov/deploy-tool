<?php

namespace App\Http\Controllers\ProjectService;

use App\Http\Controllers\Controller;
use App\Models\ProjectService;
use App\Models\ProjectServiceEnvVar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectServiceEnvVarsController extends Controller
{
    public function takeMany(Request $request, int $projectId, int $projectServiceId)
    {
        $projectServiceEnvVars = ProjectServiceEnvVar::query()
            ->where('project_service_id', $projectServiceId)
            ->get()
        ;

        $projectServiceEnvVarsPromited = [];

        foreach ($projectServiceEnvVars as $projectServiceEnvVar) {
            $projectServiceEnvVarsPromited[] = array_merge($projectServiceEnvVar->getAttributes(), [
                'var' => $projectServiceEnvVar->var,
            ]);
        }

        return $this->success($projectServiceEnvVarsPromited);
    }

    // public function create(Request $request, int $projectId, int $projectServiceId)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'service_env_var_id' => 'required|exists:service_env_vars,id',
    //         'value' => 'required|string'
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->error('Passed invalid data', $validator->errors());
    //     }

    //     $projectServiceEnvVar = ProjectServiceEnvVar::query()->create([
    //         'project_service_id' => $projectServiceId,
    //         'service_env_var_id' => $request->post('service_env_var_id'),
    //         'value' => $request->post('value'),
    //     ]);

    //     $this->projectServiceEnvVarsWasChanged($projectServiceId);

    //     return $this->success(['id' => $projectServiceEnvVar->id], 201);
    // }

    public function update(Request $request, int $projectId, int $projectServiceId, int $id)
    {
        $validator = Validator::make($request->all(), [
            'value' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $projectServiceEnvVar = ProjectServiceEnvVar::query()->find($id);
        $projectServiceEnvVar->update([
            'value' => $request->post('value'),
        ]);

        $this->projectServiceEnvVarsWasChanged($projectServiceId);

        return $this->success(['id' => $projectServiceEnvVar->id]);
    }

    // public function delete(Request $request, int $projectId, int $projectServiceId, int $id)
    // {
    //     $projectServiceEnvVar = ProjectServiceEnvVar::query()->find($id);
    //     $projectServiceEnvVar->delete();

    //     $this->projectServiceEnvVarsWasChanged($projectServiceId);

    //     return $this->success(null, 204);
    // }

    private function projectServiceEnvVarsWasChanged(int $projectServiceId)
    {
        $projectService = ProjectService::query()->find($projectServiceId);
        $projectService->has_unapplied_changes = true;
        $projectService->configured = $this->isConfigured($projectService);
        $projectService->save();
    }

    private function isConfigured(ProjectService $projectService)
    {
        $service = $projectService->service;

        if ($service->envVars->count() === 0) {
            return true;
        }

        foreach ($service->envVars as $envVar) {
            $setted = false;

            foreach ($projectService->envVars as $projectServiceEnvVar) {
                if (
                    $envVar->id === $projectServiceEnvVar->service_env_var_id 
                    && $projectServiceEnvVar->value !== null
                ) {
                    $setted = true;
                    break;
                }
            }

            if ($setted === false) {
                break;
            }
        }

        return $setted;
    }
}
