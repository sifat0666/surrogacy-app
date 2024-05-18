<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgencyUserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'agency_id' => $this->agency_id,
            'user_type' => $this->user_type,
            'country' => $this->country,
            'state' => $this->state,
            'cover' => $this->cover,
            'images' => $this->images,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'phone_number' => $this->phone_number,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
