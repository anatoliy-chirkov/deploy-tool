<?php

use Illuminate\Support\Facades\Route;

Route::post('/sign-in', 'AuthController@signIn');

Route::middleware('auth.header_token')->group(function () {
    Route::get('/me', 'AuthController@me');
    Route::get('/sign-out', 'AuthController@signOut');

    Route::get('/projects', 'ProjectController@takeMany');
    Route::get('/projects/{id}', 'ProjectController@takeOne');
    Route::post('/projects', 'ProjectController@create');
    Route::delete('/projects/{id}', 'ProjectController@delete');
    Route::patch('/projects/{id}/{action}', 'ProjectController@run');

    Route::get('/services', 'ServiceController@takeMany');
    Route::get('/services/{id}', 'ServiceController@takeOne');

    Route::namespace('ProjectService')->group(static function () {
        Route::post('/projects/{id}/services', 'ProjectServiceController@create');
        Route::delete('/projects/{projectId}/services/{id}', 'ProjectServiceController@delete');
        Route::patch('/projects/{projectId}/services/{id}/{action}', 'ProjectServiceController@run');

        // env vars 
        Route::get('/projects/{projectId}/services/{serviceId}/vars', 'ProjectServiceEnvVarsController@takeMany');
        Route::put('/projects/{projectId}/services/{serviceId}/vars/{id}', 'ProjectServiceEnvVarsController@update');

        // volumes 
        Route::get('/projects/{projectId}/services/{serviceId}/volumes', 'ProjectServiceVolumesController@takeMany');
        Route::post('/projects/{projectId}/services/{serviceId}/volumes', 'ProjectServiceVolumesController@create');
        Route::put('/projects/{projectId}/services/{serviceId}/volumes/{id}', 'ProjectServiceVolumesController@update');
        Route::delete('/projects/{projectId}/services/{serviceId}/volumes/{id}', 'ProjectServiceVolumesController@delete');
    });
});
