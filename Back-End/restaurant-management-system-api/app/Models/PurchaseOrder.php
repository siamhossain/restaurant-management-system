<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    public function particulars() {
        return $this->hasMany(PurchaseOrderParticular::class, 'product_purchase_uuid', 'uuid');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class, 'supplier_uuid', 'uuid');
    }
}
