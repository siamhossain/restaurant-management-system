<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AccountHead extends Model
{
    use HasFactory;

    public function accountCategory()
    {
       return $this->belongsTo(AccountCategory::class, 'account_category_uuid', 'uuid');
    }
}
