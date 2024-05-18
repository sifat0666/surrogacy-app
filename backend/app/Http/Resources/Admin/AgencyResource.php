<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Favorite;
use App\Http\Resources\ImageResource;
use App\Http\Resources\SubscriptionResource;

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
        $subscription = $this->subscriptions()->active()->latest()->first();

        $isFavorite = false;
        if (auth('sanctum')->check())
        {
            $isFavorite = Favorite::where('user_id', auth('sanctum')->id())->where('favorited_user_id', $this->id)->exists();
        }

        return [
            'id' => $this->id,
            'last_login' => $this->last_login,
            'is_favorite' => $isFavorite,
            'total_profiles' => count($this->users),
            'user_type' => $this->user_type,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'images_path' => new ImageResource($this->images),
            'name' => $this->name,
            'email' => $this->email,
            'provider' => $this->provider,
            'country' => $this->country,
            'state' => $this->state,
            'assisted_groups' => $this->assisted_groups,
            'about' => $this->about,
            'contact_email' => $this->contact_email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'created_at' => $this->created_at,
            'subscription' => $subscription ? new SubscriptionResource($subscription) : null,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
