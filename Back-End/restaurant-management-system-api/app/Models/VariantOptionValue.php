<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantOptionValue extends Model
{
    use HasFactory;

    protected $attributes = ['ip' => '', 'agent' => ''];

    public function variant_option(){
        return $this->belongsTo(VariantOption::class, 'variant_option_uuid', 'uuid');
    }
}
