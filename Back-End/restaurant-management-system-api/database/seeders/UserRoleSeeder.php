<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_roles = array(
            array('id' => 1,'key' => 'super_admin', 'title' => 'Super Admin'),
            array('id' => 2,'key' => 'kitchen_manager', 'title' => 'Kitchen manager'),
            array('id' => 3,'key' => 'waiter', 'title' => 'Waiter'),
            array('id' => 4,'key' => 'chef', 'title' => 'Chef'),
            array('id' => 5,'key' => 'manager', 'title' => 'Manager'),
        );
        DB::table('user_roles')->insert($user_roles);
    }
}
