<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'contact_email' => $this->contact_email,
            //'password' => $this->password,
            'agency_id' => $this->agency_id,
            'user_type' => $this->user_type,
            'country' => $this->country,
            'state' => $this->state,
            'surrogacy_type' => $this->surrogacy_type,
            'is_first_surrogacy_journey' => $this->is_first_surrogacy_journey === null ? null : ($this->is_first_surrogacy_journey ? true : false),
            'is_working_with_agency' => $this->is_working_with_agency === null ? null : ($this->is_working_with_agency ? true : false),
            'date_of_birth' => $this->date_of_birth,
            'age' => $this->date_of_birth ? $this->age : null,
            'have_frozen_embryos' => $this->have_frozen_embryos === null ? null : ($this->have_frozen_embryos ? true : false),
            'have_children' => $this->have_children === null ? null : ($this->have_children ? true : false),
            'height' => $this->height,
            'weight' => $this->weight,
            'when_to_start_journey' => $this->when_to_start_journey,
            'relationship_status' => $this->relationship_status,
            'willing_to_help_types' => $this->willing_to_help_types,
            'is_smoke_or_tobacco' => $this->is_smoke_or_tobacco === null ? null : ($this->is_smoke_or_tobacco ? true : false),
            'is_willing_to_travel' => $this->is_willing_to_travel === null ? null : ($this->is_willing_to_travel ? true : false),
            'assisted_groups' => $this->assisted_groups,
            'surrogate_location' => $this->surrogate_location,
            'type_of_journey' => $this->type_of_journey,
            'intended_parent_location' => $this->intended_parent_location,
            'about' => $this->about,
            'cover' => $this->cover,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'images' => $this->images,
            'gallery' => $this->gallery,
            'images_path' => new ImageResource($this->images),
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'socal_media' => $this->socal_media,
            'is_subscribed' => $this->subscribed('default') ? true : false,
            'is_surrogate_verified' => $this->is_surrogate_verified ? true : false,
            'profile_completeness' => $this->profileCompleteness,
            'surrogate_verification_image' => $this->surrogate_verification_image,
            'surrogate_verification_number' => $this->surrogate_verification_number,
            'surrogate_verification_address' => $this->surrogate_verification_address,
            'services_provided' => $this->services_provided,
            'journey_length' => $this->journey_length,
            'membership_affilations' => $this->membership_affilations,
            'surrogate_matching_time' => $this->surrogate_matching_time,
        ];
    }
}
