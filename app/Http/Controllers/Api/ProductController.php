<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::all();

        if ($product->isEmpty()) {
            return $this->sendError('No records found');
        }

        return $this->sendResponse(ProductResource::collection($product), 'Products retrieved successfully.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return JsonResponse
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $productData = $request->validated();

        if ($request->hasFile('product_image') && $request->file('product_image')->isValid()) {
            $imgFile = $request->file('product_image');
            $productData['product_image'] =  $this->storeImage($imgFile);
        }
    
        try {
            $product = Product::create($productData);
        } catch (\Exception $e) {
            return $this->sendError('Product creation failed',[$e->getMessage()], 500);
        }

        return $this->sendResponse(new ProductResource($product), 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        if (is_null($product)){
            return $this->sendError('Product not found.');
        }

        return $this->sendResponse(new ProductResource($product), 'Product retrieved successfully.');
    }

    /**
     * Update Product details
     *
     * @param StoreProductRequest $request
     * @param Product $product
     * @return JsonResponse
     */
    public function update(StoreProductRequest $request, Product $product): JsonResponse
    {   
        $productData = $request->validated();
        $previousProductImage = $product->product_image;
        
        if ($request->hasFile('product_image') && $request->file('product_image')->isValid()) {

            if (!empty($previousProductImage) && file_exists(public_path('/images/products/'. $previousProductImage))){
                unlink(public_path('/images/products/'. $previousProductImage));
            }
            $imgFile = $request->file('product_image');
            $productData['product_image'] = $this->storeImage($imgFile);
        } 
    
        try {
             $product->update($productData);
        } catch (\Exception $e) {
            return $this->sendError('Product creation failed',[$e->getMessage()], 500);
        } 

        return $this->sendResponse(new ProductResource($product), 'Product Updated successfully.');  
    }

    /**
     * Delete Product item
     *
     * @param Product $product
     * @return JsonResponse
     */ 
    public function destroy(Product $product): JsonResponse
    {
        $filePath = public_path('images/products/' . $product->product_image);

        if (file_exists($filePath)) {
            if (!unlink($filePath)) {
                return $this->sendError("Failed to delete the product image.");
            }
        }

        if ($product->delete()) {
            return $this->sendResponse(new ProductResource($product), 'Product Deleted successfully.');
        }

        return $this->sendError("Product Can't be deleted.");
    }
     
    /**
     * Store the uploaded image and return the image file name
     *
     * @param \Illuminate\Http\UploadedFile $imgFile
     * @return string
     */
    private function storeImage($imgFile): string {
        $productImage = time() . '.' . $imgFile->getClientOriginalExtension();
        $destinationPath = public_path('/images/products');
        $imgFile->move($destinationPath, $productImage);

        return $productImage;
    }
}
