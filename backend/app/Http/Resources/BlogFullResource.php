<?php

namespace App\Http\Resources;

use Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogFullResource extends JsonResource
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
            'category' => $this->category,
    		'title' => $this->title,
            'image' => $this->image,
            'image_path' => asset($this->image),
            'content' => $this->content,
            'seo_title' => $this->seo_title,
            'seo_desciption' => $this->seo_desciption,
            'seo_tags' => $this->seo_tags,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
