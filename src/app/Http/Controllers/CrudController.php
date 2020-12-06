<?php

namespace App\Http\Controllers;


use App\Service\Contracts\ICrudService;
use Illuminate\Http\Request;

class CrudController extends Controller
{
    protected ICrudService $crudService;

    public function __construct(ICrudService $service)
    {
        $this->crudService = $service;
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(
                $this->crudService->getAll()
        );
    }

    /**
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        return response()->json(
            $this->crudService->getOne($id)
        );
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        return response()->json(
            [],
            $this->crudService->create($request->all()) ? 201 : 400
        );
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
    {
        return response()->json(
            [],
            $this->crudService->update($id,$request->all()) ? 200 : 400
        );
    }

    /**
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        return response()->json(
            [],
            $this->crudService->delete($id) ? 200 : 400
        );
    }
}
