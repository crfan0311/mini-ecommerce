<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'product_image'
    ];

    public function supplierProduct()
    {
        return $this->belongsTo(SupplierProduct::class, 'id', 'product_id');
    }
}
