<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerPayment extends Model
{
    use HasFactory;

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_uuid', 'uuid');
    }
}
