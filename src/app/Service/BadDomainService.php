<?php

namespace App\Service;

use App\Models\BadDomain;
use App\Service\Contracts\ICrudService;


class BadDomainService implements ICrudService
{


    public function getAll(): array
    {
        return BadDomain::all()->toArray();
    }

    public function create(array $data): bool
    {
        $badDomain = BadDomain::firstOrCreate($data);
        return $badDomain->exists;
    }

    public function getOne($id): array
    {
        return BadDomain::find($id);
    }

    public function update($id, array $data): bool
    {
        $click = BadDomain::find($id);
        return $this->setData($click, $data);
    }

    public function delete($id): void
    {
        BadDomain::find($id)->delete();
    }



}
