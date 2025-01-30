<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'product_details' => $this->product_details,
            'product_image' => $this->product_image,
            'quantity' => $this->quantity,
            'updated_at' => $this->updated_at->format('Y-m-d'),
            'quantity' => $this->quantity,
        ];
    }
}
