<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariantCombination extends Model
{
    use HasFactory;

    public function variant_option() {
        return $this->belongsTo(VariantOption::class, 'variant_option_uuid', 'uuid');
    }

    public function variant_option_value() {
        return $this->belongsTo(VariantOptionValue::class, 'variant_option_value_uuid', 'uuid');
    }
}
