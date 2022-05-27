<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductVariant extends Model
{
    use HasFactory;

    protected $attributes = ['ip' => '', 'agent' => ''];

    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => request()->ip(), 'agent' => request()->header('User-Agent')];
        parent::__construct($attributes);
    }

    public function variant_combinations()
    {
        return $this->hasMany(ProductVariantCombination::class, 'product_variant_uuid', 'uuid')->with('variant_option')->with('variant_option_value');
    }

    public function variant_media()
    {
        return $this->hasMany(ProductVariantMedia::class, 'product_variant_uuid', 'uuid');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_uuid', 'uuid')->with('brand')->with('category');
    }

}
