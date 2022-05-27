<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableBooking extends Model
{
    use HasFactory;

    public function booking_food_list() {
        return $this->hasMany(BookingFoodList::class, 'booking_uuid', 'uuid');
    }
}
