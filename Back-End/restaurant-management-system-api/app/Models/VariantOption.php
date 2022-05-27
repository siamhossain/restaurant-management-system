<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantOption extends Model
{
    use HasFactory;
    protected $attributes = ['ip' => '', 'agent' => ''];

    public function variant_option_value() {
        return $this->hasMany(ProductVariantCombination::class, "variant_option_uuid", "uuid");
    }
}
