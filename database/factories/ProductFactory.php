<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'product_image' => fake()->image(public_path('images/products'),700,420, null, false),
            'product_name' => fake()->word(1, true),
            'product_details' => fake()->word(15),
            'quantity' => fake()->numberBetween(5, 15),  
        ];


    }
}
