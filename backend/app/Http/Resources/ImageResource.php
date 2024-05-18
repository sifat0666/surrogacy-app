<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
{
    $images = [];
    
    // Check if resource is null or empty
    if (!empty($this->resource)) {
        $tempImages = json_decode($this->resource);

        // Check if JSON decoding was successful
        if (json_last_error() === JSON_ERROR_NONE && is_array($tempImages)) {
            foreach ($tempImages as $imageKey => $image)
            {
                if (file_exists(public_path($image)))
                {
                    $images[] = asset($image);
                }
            }
        }
    }

    // If no valid images found or if resource is null or empty
    if (empty($images))
    {
        $images[] = asset('img/no-image-500x500.png');
    }

    return $images;
}

}
