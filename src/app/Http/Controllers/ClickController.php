<?php

namespace App\Http\Controllers;

use App\Service\ClickService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClickController extends CrudController
{

    public function __construct(ClickService $clickService)
    {
        $this->crudService = $clickService;
    }

    public function recordClick(Request $request)
    {

        $data = $request->all();

        $data['ua'] = $request->server('HTTP_USER_AGENT');
        $data['ip'] = $request->ip();
        $data['ref'] = $request->headers->get('referer', '');

        $result = $this->crudService->create(
            $data
        );

        $hash = $this->crudService->makeHash($data);

        return Redirect::route(
            $result ? 'click_success' : 'click_error',
            $hash
        );
    }

}
