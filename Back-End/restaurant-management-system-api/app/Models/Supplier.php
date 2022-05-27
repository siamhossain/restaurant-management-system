<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $attributes = ['ip' => '', 'agent' => ''];

    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => request()->ip(), 'agent' => request()->header('User-Agent')];
        parent::__construct($attributes);
    }
}
