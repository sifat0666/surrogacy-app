<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $package = null;
        
        return [
            'id' => $this->id, 
            'name' => $this->package_name, 
            'stripe_status' => $this->stripe_status,
            'valid' => $this->valid(),
            'incomplete' => $this->incomplete(),
            'past_due' => $this->pastDue(),
            'active' => $this->active(),
            'recurring' => $this->recurring(),
            'canceled' => $this->canceled(),
            'ended' => $this->ended(),
            'on_trial' => $this->onTrial(),
            'has_expired_trial' => $this->hasExpiredTrial(),
            'on_grace_period' => $this->onGracePeriod(),
            'trial_ends_at' => $this->trial_ends_at ? date('Y-m-d H:i:s', strtotime($this->trial_ends_at)) : null,
            'ends_at' => $this->ends_at ? date('Y-m-d H:i:s', strtotime($this->ends_at)) : null,
            'created_at' => $this->created_at ? date('Y-m-d H:i:s', strtotime($this->created_at)) : null,
            'current_period_end' => $this->current_period_end ? date('Y-m-d H:i:s', $this->current_period_end) : null,
            'current_period_start' => $this->current_period_start ? date('Y-m-d H:i:s', $this->current_period_start) : null,
        ];
    }
}
