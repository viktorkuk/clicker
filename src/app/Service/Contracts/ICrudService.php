<?php

namespace App\Service\Contracts;

interface ICrudService
{

    public function getAll(): array;

    public function create(array $data): bool;

    public function getOne(int $id): array;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;

}
