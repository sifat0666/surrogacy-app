<?php

namespace App\Http\Resources;

use Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
    		'is_seen' => $this->is_seen ? true : false,
            'target_user' => $this->target_user ? [
                'id' => $this->target_user->id ? $this->target_user->id : null,
                'name' => $this->target_user->name ? $this->target_user->name : null,
                'agency_id' => $this->target_user->agency_id ? $this->target_user->agency_id : null,
                'user_type' => $this->target_user->user_type ? $this->target_user->user_type : null,
                'images' => $this->target_user->images ? $this->target_user->images : null,
                'country' => $this->target_user->country ? $this->target_user->country : null,
                'state' => $this->target_user->state ? $this->target_user->state : null,
                'cover_path' => $this->target_user->cover ? asset($this->target_user->cover) : null,
            ] : null,
            'title' => $this->title,
            'description' => $this->description,
    		'created_at' => $this->created_at,
        ];
    }
}
