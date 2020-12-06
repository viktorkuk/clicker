<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Click extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ua' => $this->ua,
            'ip'=> $this->ip,
            'ref'=> $this->ref,
            'param1'=> $this->param1,
            'param2'=> $this->param2,
            'bad_domain'=> $this->badDomain()->name(),
        ];

        //return parent::toArray($request);
    }
}
