<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return <<<HTML
        <p>DeployTool</p>
HTML;
});
