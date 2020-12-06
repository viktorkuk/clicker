<?php


namespace App\Service;

use App\Models\Click;
use App\Models\BadDomain;
use Illuminate\Support\Arr;
use App\Service\Contracts\ICrudService;
use Illuminate\Support\Facades\Hash;
use phpDocumentor\Reflection\Types\Void_;
use function md5;



class ClickService implements ICrudService
{

    public function getAll(): array
    {
        return Click::all()->toArray();
    }

    public function getOne(int $id): array
    {
        return Click::find($id)->toArray();
    }


    public function delete(int $id): bool
    {
        return Click::find($id)->delete();
    }


    public function update(int $id, array $data): bool
    {
        return Click::find($id)->update($data);
    }

    public function create(array $data): bool
    {
        $result = true;

        $click = Click::firstOrNew(
            Arr::only($data, Click::UNIQUE_KEYS),
            Arr::except($data, Click::UNIQUE_KEYS)
        );

        if ($click->exists) {
            $click->increment('error');
            $result = false;
        }

        if ( !empty($data['ref']) )  {

            $parts = parse_url($data['ref']);

            if (isset($parts['host']) && BadDomain::firstWhere('name', $parts['host'])) {
                $click->bad_domain = true;
                $result = false;
            }
        }

        $click->save();

        return $result;

    }


    public function makeHash($data): string
    {
        return md5($data['ua'] . $data['ip'] . $data['ref'] . $data['param1']);
    }

}
