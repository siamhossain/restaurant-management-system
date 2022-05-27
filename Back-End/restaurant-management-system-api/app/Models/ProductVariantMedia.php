<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariantMedia extends Model
{
    use HasFactory;
    protected $table = "product_variant_media";
    protected $fillable = ['product_uuid', 'product_variant_uuid', 'variant_image_uri'];
}
