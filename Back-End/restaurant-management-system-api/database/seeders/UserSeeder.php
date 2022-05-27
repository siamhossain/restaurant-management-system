<?php

namespace Database\Seeders;

use App\Features\UAP;
use App\Helpers\DocumentCode;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    private function createUser($name, $username, $email, $phone, $password)
    {
        $module_code = UAP::$MODULES['USER']['Code'];
        $prefix = UAP::$MODULES['USER']['DocCodePrefix'];
        $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

        User::create([
            'code' => $generated_doc_code,
            'name' => $name,
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'password' => Hash::make($password),
        ]);

        DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Admin User
        $this->createUser("eDorpon Admin", "developer", "developer@edorpon.com", "01918450814", "devEd");
    }
}
