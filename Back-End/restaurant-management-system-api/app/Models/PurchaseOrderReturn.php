<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrderReturn extends Model
{
    use HasFactory;

    public function particulars() {
        return $this->hasMany(PurchaseOrderReturnParticular::class, 'product_purchase_return_uuid', 'uuid');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_uuid', 'uuid');
    }
}
