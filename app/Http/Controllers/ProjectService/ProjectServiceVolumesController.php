<?php

namespace App\Http\Controllers\ProjectService;

use App\Http\Controllers\Controller;
use App\Models\ProjectService;
use App\Models\ProjectServiceVolume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectServiceVolumesController extends Controller
{
    public function takeMany(Request $request, int $projectId, int $projectServiceId)
    {
        $projectServiceVolumes = ProjectServiceVolume::query()
            ->where('project_service_id', $projectServiceId)
            ->get()
        ;

        return $this->success($projectServiceVolumes);
    }

    public function create(Request $request, int $projectId, int $projectServiceId)
    {
        $validator = Validator::make($request->all(), [
            'local_path' => 'required|string',
            'container_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $projectServiceVolume = ProjectServiceVolume::query()->create([
            'project_service_id' => $projectServiceId,
            'local_path' => $request->post('local_path'),
            'container_path' => $request->post('container_path'),
        ]);

        $this->projectServiceVolumesWasChanged($projectServiceId);

        return $this->success(['id' => $projectServiceVolume->id], 201);
    }

    public function update(Request $request, int $projectId, int $projectServiceId, int $id)
    {
        $validator = Validator::make($request->all(), [
            'local_path' => 'required|string',
            'container_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $projectServiceVolume = ProjectServiceVolume::query()->find($id);
        $projectServiceVolume->update([
            'local_path' => $request->post('local_path'),
            'container_path' => $request->post('container_path'),
        ]);

        $this->projectServiceVolumesWasChanged($projectServiceId);

        return $this->success(['id' => $projectServiceVolume->id]);
    }

    public function delete(Request $request, int $projectId, int $projectServiceId, int $id)
    {
        $projectServiceVolume = ProjectServiceVolume::query()->find($id);
        $projectServiceVolume->delete();

        $this->projectServiceVolumesWasChanged($projectServiceId);

        return $this->success(null, 204);
    }

    private function projectServiceVolumesWasChanged(int $projectServiceId)
    {
        $projectService = ProjectService::query()->find($projectServiceId);;
        $projectService->has_unapplied_changes = true;
        $projectService->save();
    }
}
