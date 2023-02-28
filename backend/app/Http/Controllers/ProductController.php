<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SupplierProduct;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['products' => Product::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->file("image")) {
            $fileName = time() . $request->file("image")->getClientOriginalName();
            $filePath = $fileName;
            $result = Storage::disk('public')->put($filePath, file_get_contents($request->file("image")));
            if ($result) {
                $product = Product::create([
                    "title" => $request->get('title'),
                    "description" => $request->get('description'),
                    "price" => $request->get('price'),
                    "product_image" => $filePath
                ]);

                SupplierProduct::create([
                    'supplier_id' => Auth::id(),
                    'product_id' => $product->id
                ]);

                return response()->json(['product' => $product, 'message' => 'Product created successfully']);
            }
        }

        return response()->json(['message' => 'There was some error', 400]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();
        $data = [
            "title" => $request->get('title'),
            "description" => $request->get('description'),
            "price" => $request->get('price'),
        ];
        if ($request->file("image")) {
            Storage::delete($product->product_image);
            $fileName = time() . $request->file("image")->getClientOriginalName();
            $filePath = $fileName;
            $result = Storage::disk('public')->put($filePath, file_get_contents($request->file("image")));
            if ($result) {
                $data['product_image'] = $filePath;
            }
        }

        Product::where('id', $id)->update($data);

        return response()->json(['message' => 'Product updated successfully', 'product' => Product::where('id', $id)->first()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if (Storage::exists($product->product_image)) {
            Storage::delete([$product->product_image]);
        }
        Product::where('id', $product->id)->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
