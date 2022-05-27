<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientPurchase extends Model
{
    use HasFactory;

    public function particulars() {
        return $this->hasMany(IngredientPurchaseParticular::class, 'ingredient_purchase_uuid', 'uuid')->with('ingredient');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_uuid', 'uuid');
    }


}
