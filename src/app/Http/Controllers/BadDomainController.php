<?php

namespace App\Http\Controllers;

use App\Service\BadDomainService;


class BadDomainController extends CrudController
{

    public function __construct(BadDomainService $crudService)
    {
        $this->crudService = $crudService;
    }

}
