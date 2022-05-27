<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wastage extends Model
{
    use HasFactory;
    protected $table = "wastages";
    protected $attributes = ['ip' => '', 'agent' => ''];

    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => request()->ip(), 'agent' => request()->header('User-Agent')];
        parent::__construct($attributes);
    }

    public function particulars()
    {
        return $this->hasMany(WastageParticular::class, 'wastage_uuid', 'uuid');
    }
}
