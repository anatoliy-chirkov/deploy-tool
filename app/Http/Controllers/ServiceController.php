<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function takeMany(Request $request)
    {
        $services = Service::all();
        return $this->success($services);
    }

    public function takeOne(Request $request, int $id)
    {
        $service = Service::query()->find($id);

        return $this->success(array_merge($service->getAttributes(), [
            'env_vars' => $service->envVars,
            'config_file' => $service->configFile,
        ]));
    }
}
