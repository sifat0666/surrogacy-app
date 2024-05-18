<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class UserResourceLogin extends JsonResource
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

        if ($this->user_type == 'Agency')
        {
            $profiles = User::where('agency_id', $this->id)->pluck('id')->all();
            $profiles = collect($profiles)->map(function ($id) {return str_pad($id, 10, '0', STR_PAD_LEFT);});
        }
        else
        {
            $profiles = [];
        }
        
        return [
    		'id' => $this->id,
            'provider' => $this->provider,
    		'name' => $this->name,
    		'email' => $this->email,
            'contact_email' => $this->contact_email,
    		'user_type' => $this->user_type,
    		'cover_path' => $this->cover ? asset($this->cover) : null,
            'country' => $this->country,
    		'state' => $this->state,
            'subscription' => $subscription ? new SubscriptionResource($subscription) : null,
            'is_surrogate_verified' => $this->is_surrogate_verified ? true : false,
            'profile_completeness' => $this->profileCompleteness,
    	];
    }
}
