<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Favorite;

class AgencyResourceWithProfiles extends JsonResource
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

        $intendedParents = User::where('user_type', 'Intended Parent')->where('agency_id', $this->id)->latest()->get();
        $intendedParents = IntendedParentResource::collection($intendedParents);

        $surrogates = User::where('user_type', 'Surrogate')->where('agency_id', $this->id)->latest()->get();
        $surrogates = IntendedParentResource::collection($surrogates);

        return [
            'id' => $this->id,
            'last_login' => $this->last_login,
            'is_favorite' => $isFavorite,
            'user_type' => $this->user_type,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'images' => $this->images,
            'gallery' => $this->gallery,
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
            'intendedParents' => $intendedParents,
            'surrogates' => $surrogates,
            'profile_completeness' => $this->profileCompleteness,
            'services_provided' => $this->services_provided,
            'journey_length' => $this->journey_length,
            'surrogate_matching_time' => $this->surrogate_matching_time,
            'membership_affilations' => $this->membership_affilations,
        ];
    }
}
