<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Favorite;

class AgencyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $isFavorite = false;
        if (auth('sanctum')->check())
        {
            $isFavorite = Favorite::where('user_id', auth('sanctum')->id())->where('favorited_user_id', $this->id)->exists();
        }

        return [
            'id' => $this->id,
            'last_login' => $this->last_login,
            'is_favorite' => $isFavorite,
            'user_type' => $this->user_type,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'images' => $this->images,
            'images_path' => new ImageResource($this->images),
            'name' => $this->name,
            'country' => $this->country,
            'state' => $this->state,
            'assisted_groups' => $this->assisted_groups,
            'about' => $this->about,
            'contact_email' => $this->contact_email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'created_at' => $this->created_at,
            'is_subscribed' => $this->subscribed('default') ? true : false,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
