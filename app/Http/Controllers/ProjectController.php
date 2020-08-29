<?php

namespace App\Http\Controllers;

use App\Jobs\CreateProjectFoldersJob;
use App\Jobs\RunProjectActionJob;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function takeMany(Request $request)
    {
        $projectsQuery = Project::query();
        // $projectsQuery->where('user_id', $this->user($request)->id)
        $projects = $projectsQuery->get();

        return $this->success($projects);
    }

    public function takeOne(Request $request, int $id)
    {
        $project = Project::query()->find($id);

        // if ($project->user_id !== $this->user($request)->id) {
        //     return $this->error('You hasn\'t access to this project', null, 403);
        // }

        $services = [];

        foreach ($project->services as $service) {
            $services[] = array_merge($service->getAttributes(), [
                'service' => $service->service->getAttributes(),
            ]);
        }

        return $this->success([
            'project' => array_merge($project->getAttributes(), [
                'services' => $project->services,
            ])
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|min:2|unique:projects',
        ]);

        if ($validator->fails()) {
            return $this->error('Passed invalid data', $validator->errors());
        }

        $projectSlug = str_slug($request->post('name'));
        $projectPath = base_path(env('PROJECTS_ROOT').'/'.$projectSlug);
        $project = Project::query()->create([
            //'user_id' => $this->user($request)->id,
            'name' => $request->post('name'),
            'slug' => $projectSlug,
            'path' => $projectPath,
            'serialized_config' => Project::getDockerComposeSerializedTemplate(),
            'status' => Project::STATUS_UNACTIVE,
        ]);

        CreateProjectFoldersJob::dispatch($project);

        return $this->success($project->getAttributes(), 201);
    }

    public function delete(Request $request, int $id)
    {
        $project = Project::query()->find($id);
        $project->delete();

        return $this->success(null, 204);
    }

    public function run(Request $request, int $id, string $action)
    {
        RunProjectActionJob::dispatch(Project::query()->find($id), $action);

        return $this->success(null, 204);
    }
}
