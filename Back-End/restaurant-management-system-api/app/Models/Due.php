<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Due extends Model
{
    use HasFactory;

    public function customer() {
        return $this->belongsTo(Customer::class, 'participant_uuid', 'uuid');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class, 'participant_uuid', 'uuid');
    }
}
