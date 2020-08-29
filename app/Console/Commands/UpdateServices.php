<?php

namespace App\Console\Commands;

use App\Models\Service;
use App\Models\ServiceConfigFile;
use App\Models\ServiceEnvVar;
use Illuminate\Console\Command;

class UpdateServices extends Command
{
    private const CONFIG_FILE_NAME = 'service.json';

    protected $signature = 'update:services';
    protected $description = 'An update services from services/ dir';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $rootServicesPath = base_path('services');
        $servicesPaths = $this->getCatalogPaths($rootServicesPath);

        if ($servicesPaths === null) {
            return 1;
        }

        $counter = 0;

        foreach ($servicesPaths as $servicePath) {
            $configExpectedPath = $servicePath.'/'.self::CONFIG_FILE_NAME;

            if (file_exists($configExpectedPath)) {
                $this->parseServiceFromFile($configExpectedPath);
                $counter++;
            }
        }

        $this->info(" {$counter} created.\n");

        return 0;
    }

    private function parseServiceFromFile(string $configPath): void
    {
        $config = file_get_contents($configPath);
        $serviceData = json_decode($config);

        $serviceBasePath = str_replace(self::CONFIG_FILE_NAME, '', $configPath);
        list($image, $build) = $this->resolveImageBuild($serviceData->image, $serviceBasePath);

        if (
            Service::query()
                ->where('name', $serviceData->name)
                ->where('version', $serviceData->version)
                ->where('image', $image)
                ->where('build', $build)
                ->first() !== null
        ) {
            return;
        }

        $service = Service::query()->create([
            'name' => $serviceData->name,
            'version' => $serviceData->version,
            'description' => $serviceData->description,
            'image' => $image,
            'build' => $build,
            'cache_path' => $serviceData->cachedir,
            'work_path' => $serviceData->workdir,
        ]);

        if (!empty($serviceData->env)) {
            foreach ($serviceData->env as $var) {
                ServiceEnvVar::query()->create([
                    'service_id' => $service->id,
                    'var' => $var->var,
                    'name' => $var->name,
                    'description' => $var->description,
                ]);
            }
        }

        if (!empty($serviceData->config) && !empty($serviceData->config->path)) {
            $fullPathToDefault = null;
            $squeezedPathToDefault = $serviceData->config->default;

            if (!empty($squeezedPathToDefault)) {
                $fullPathToDefault = $serviceBasePath.substr($squeezedPathToDefault, 2);
            }

            ServiceConfigFile::query()->create([
                'service_id' => $service->id,
                'path_to_default' => $fullPathToDefault,
                'container_path' => $serviceData->config->path,
            ]);
        }
    }

    private function resolveImageBuild(string $configDataImage, string $serviceBasePath)
    {
        list($image, $build) = [null, null];

        if (substr($configDataImage, 0, 1) === '.') {
            $build = $serviceBasePath.substr($configDataImage, 2);
        } else {
            $image = $configDataImage;
        }

        return [$image, $build];
    }

    private function getCatalogPaths(string $path)
    {
        $items = scandir($path);

        if ($items === false) {
            return null;
        }

        $aliveItems = array_diff($items, ['.', '..']);

        $fullPaths = [];

        foreach ($aliveItems as $aliveItem) {
            $fullPaths[] = $path.'/'.$aliveItem;
        }

        return $fullPaths;
    }
}
