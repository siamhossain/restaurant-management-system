<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    use HasFactory;

    public function particulars() {
        return $this->hasMany(SalesOrderParticular::class, 'sales_order_uuid', 'uuid');
    }

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_uuid', 'uuid');
    }

    public function sales_by()
    {
        return $this->belongsTo(User::class, 'created_by_uuid', 'uuid');
    }
}
