<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;



    public function category()
    {
        return $this->belongsTo(IngredientCategory::class, 'category_uuid', 'uuid');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_uuid', 'uuid');
    }

    public function media() {
        return $this->hasMany(IngredientMedia::class, "ingredient_uuid", "uuid");
    }
}
