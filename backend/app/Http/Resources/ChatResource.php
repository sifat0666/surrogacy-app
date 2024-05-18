<?php

namespace App\Http\Resources;

use Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $sender = null;
        $targetUser = null;
        $loggedSeenId = null;
        $otherSeenId = null;

        //if current user is target small id, then other user is large id
        if (auth('sanctum')->id() == $this->target_small_id)
        {
            $sender = new ChatUserResource($this->large_user);
            
            $loggedSeenId = $this->small_seen_id;
            $otherSeenId = $this->large_seen_id;

            //chat is for agency created profile
            if ($this->small_id != $this->target_small_id)
            {
                $targetUser = new ChatUserResource($this->small_user);
            }
        }
        //else if current user is target large id, then other user is small id
        else if (auth('sanctum')->id() == $this->target_large_id)
        {
            $sender = new ChatUserResource($this->small_user);

            $loggedSeenId = $this->large_seen_id;
            $otherSeenId = $this->small_seen_id;
            
            //chat is for agency created profile
            if ($this->large_id != $this->target_large_id)
            {
                $targetUser = new ChatUserResource($this->large_user);
            }
        }

        return [
            'id' => $this->id,
            'is_new' => $this->is_new ? true : false,
            'is_reply_restricted' => $this->is_reply_restricted ? true : false,
            'document_id' => $this->document_id,
            'small_id' => $this->small_id,
            'large_id' => $this->large_id,
            'target_small_id' => $this->target_small_id,
            'target_large_id' => $this->target_large_id,
            'logged_seen_id' => $loggedSeenId,
            'other_seen_id' => $otherSeenId,
            'sender' => $sender,
            'target_user' => $targetUser,
        ];
    }
}

class ChatUserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'user_type' => $this->user_type,
            'cover_path' => $this->cover ? asset($this->cover) : null,
            'country' => $this->country,
            'state' => $this->state,
            'is_surrogate_verified' => $this->is_surrogate_verified ? true : false,
            'is_subscribed' => $this->subscribed('default') ? true : false,
            'profile_completeness' => $this->profileCompleteness,
        ];
    }
}
