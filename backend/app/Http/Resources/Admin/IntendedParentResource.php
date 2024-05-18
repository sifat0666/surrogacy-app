<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Favorite;
use App\Http\Resources\ImageResource;
use App\Http\Resources\SubscriptionResource;

class IntendedParentResource extends JsonResource
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
            'is_agency_supported' => $this->agency ? true : false,
            'agency' => $this->agency ? [
                'id' => $this->agency->id,
                'name' => $this->agency->name,    
            ] : null,
            'last_login' => $this->last_login,
            'is_favorite' => $isFavorite,
            'user_type' => $this->user_type,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'images_path' => new ImageResource($this->images),
            'name' => $this->name,
            'email' => $this->email,
            'provider' => $this->provider,
            'country' => $this->country,
            'state' => $this->state,
            'relationship_status' => $this->relationship_status,
            'have_children' => $this->have_children === null ? null : ($this->have_children ? true : false),
            'is_willing_to_travel' => $this->is_willing_to_travel === null ? null : ($this->is_willing_to_travel ? true : false),
            'about' => $this->about,
            'surrogacy_type' => $this->surrogacy_type,
            'is_first_surrogacy_journey' => $this->is_first_surrogacy_journey === null ? null : ($this->is_first_surrogacy_journey ? true : false),
            'is_working_with_agency' => $this->is_working_with_agency === null ? null : ($this->is_working_with_agency ? true : false),
            'have_frozen_embryos' => $this->have_frozen_embryos === null ? null : ($this->have_frozen_embryos ? true : false),
            'surrogate_location' => $this->surrogate_location,
            'type_of_journey' => $this->type_of_journey,
            'when_to_start_journey' => $this->when_to_start_journey,
            'contact_email' => $this->contact_email,
            'phone_number' => $this->phone_number,
            'socal_media' => $this->socal_media,
            'created_at' => $this->created_at,
            'subscription' => $subscription ? new SubscriptionResource($subscription) : null,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
