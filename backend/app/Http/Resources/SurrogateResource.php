<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Favorite;

class SurrogateResource extends JsonResource
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
            'is_agency_supported' => $this->agency ? true : false,
            'agency' => $this->agency ? [
                'id' => $this->agency->id,
                'name' => $this->agency->name,    
            ] : null,
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
            'surrogacy_type' => $this->surrogacy_type,
            'is_first_surrogacy_journey' => $this->is_first_surrogacy_journey === null ? null : ($this->is_first_surrogacy_journey ? true : false),
            'is_working_with_agency' => $this->is_working_with_agency === null ? null : ($this->is_working_with_agency ? true : false),
            'willing_to_help_types' => $this->willing_to_help_types,
            'intended_parent_location' => $this->intended_parent_location,
            'when_to_start_journey' => $this->when_to_start_journey,
            'relationship_status' => $this->relationship_status,
            'date_of_birth' => $this->date_of_birth,
            'age' => $this->date_of_birth ? $this->age : null,
            'have_children' => $this->have_children === null ? null : ($this->have_children ? true : false),
            'height' => $this->height,
            'weight' => $this->weight,
            'is_smoke_or_tobacco' => $this->is_smoke_or_tobacco === null ? null : ($this->is_smoke_or_tobacco ? true : false),
            'is_willing_to_travel' => $this->is_willing_to_travel === null ? null : ($this->is_willing_to_travel ? true : false),
            'about' => $this->about,
            'contact_email' => $this->contact_email,
            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'created_at' => $this->created_at,
            'is_surrogate_verified' => $this->is_surrogate_verified ? true : false,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
