<?php

namespace App\Features;

class AUTH {
    public static $guards = [
        'CUSTOMER' => 'customer',
        'ADMIN' => 'admin',
    ];
}
