<?php

namespace App\Features;

use App\Models\RolePermission;

class UAP
{
    public static $ACTIONS = [
        'MODULE_ACCESS' => [
            'label' => 'Module Access (Access the module)',
            'Code' => 'MODULE_ACCESS',
        ],
        'ADD' => [
            'label' => 'Add (Make Entry)',
            'Code' => 'ADD',
        ],
        'EDIT' => [
            'label' => 'Edit (Edit Entry)',
            'Code' => 'EDIT',
        ],
        'DELETE' => [
            'label' => 'Delete (Delete Entry)',
            'Code' => 'DELETE',
        ],
        'VIEW' => [
            'label' => 'View (View Entry)',
            'Code' => 'VIEW',
        ],
        'PRINT' => [
            'label' => 'Print (Print Entry)',
            'Code' => 'PRINT',
        ],
    ];

    public static $MODULES = [
        'SUPPLIER' => [
            'label' => 'Supplier',
            'Code' => 'SUPPLIER',
            'DocCodePrefix' => 'SUP',
        ],

        'CUSTOMER' => [
            'label' => 'Customer',
            'Code' => 'CUSTOMER',
            'DocCodePrefix' => 'CUS',
        ],

        'CATEGORY' => [
            'label' => 'Category',
            'Code' => 'CATEGORY',
            'DocCodePrefix' => 'CAT',
        ],

        'BRAND' => [
            'label' => 'Brand',
            'Code' => 'BRAND',
            'DocCodePrefix' => 'BRD',
        ],

        'UNIT' => [
            'label' => 'Unit',
            'Code' => 'UNIT',
            'DocCodePrefix' => 'UNT',
        ],

        'USER' => [
            'label' => 'User',
            'Code' => 'USER',
            'DocCodePrefix' => 'USR',
        ],

        'PRODUCT' => [
            'label' => 'Product',
            'Code' => 'PRODUCT',
            'DocCodePrefix' => 'ITM',
        ],

        'PURCHASE_ORDER' => [
            'label' => 'Purchase Order',
            'Code' => 'PURCHASE_ORDER',
            'DocCodePrefix' => 'PUR',
        ],

        'PURCHASE_ORDER_RETURN' => [
            'label' => 'Purchase Order Return',
            'Code' => 'PURCHASE_ORDER_RETURN',
            'DocCodePrefix' => 'PRT',
        ],

        'ACCOUNTING_HISTORY' => [
            'label' => 'Accounting History',
            'Code' => 'ACCOUNTING_HISTORY',
            'DocCodePrefix' => 'ACH',
        ],

        'DUE' => [
            'label' => 'Due',
            'Code' => 'DUE',
            'DocCodePrefix' => 'DUE',
        ],

        'SALES_ORDER' => [
            'label' => 'Sales Order',
            'Code' => 'SALES_ORDER',
            'DocCodePrefix' => 'SEL',
        ],

        'CUSTOMER_PAYMENT' => [
            'label' => 'Customer Payment',
            'Code' => 'CUSTOMER_PAYMENT',
            'DocCodePrefix' => 'CUP',
        ],

        'SUPPLIER_PAYMENT' => [
            'label' => 'Supplier Payment',
            'Code' => 'SUPPLIER_PAYMENT',
            'DocCodePrefix' => 'SPA',
        ],

        'SALES_ORDER_RETURN' => [
            'label' => 'Sales Order Return',
            'Code' => 'SALES_ORDER_RETURN',
            'DocCodePrefix' => 'SOR',
        ],

        'INGREDIENT' => [
            'label' => 'Ingredient',
            'Code' => 'INGREDIENT',
            'DocCodePrefix' => 'ING',
        ],

        'INGREDIENT_PURCHASE' => [
            'label' => 'Ingredient Purchase',
            'Code' => 'INGREDIENT_PURCHASE',
            'DocCodePrefix' => 'INP',
        ],

        'INGREDIENT_USES' => [
            'label' => 'Ingredient Uses',
            'Code' => 'INGREDIENT_USES',
            'DocCodePrefix' => 'INU',
        ],

        'INCOME' => [
            'label' => 'Income',
            'Code' => 'INCOME',
            'DocCodePrefix' => 'INC',
        ],

        'EXPENSE' => [
            'label' => 'Expense',
            'Code' => 'EXPENSE',
            'DocCodePrefix' => 'EXP',
        ],

        'WASTAGE' => [
            'label' => 'Wastage',
            'Code' => 'WASTAGE',
            'DocCodePrefix' => 'WST',
        ],

        'BOOKING' => [
            'label' => 'Booking',
            'Code' => 'BOOKING',
            'DocCodePrefix' => 'BOK',
        ],


    ];


    public static function getRolePermissions($role_uuid)
    {
        $MODULES = [];

        foreach (self::$MODULES as $MODULE) {
            $MODULES[$MODULE['Code']] = $MODULE;

            $MODULES[$MODULE['Code']]['Actions'] = [];

            foreach (self::$ACTIONS as $ACTION) {
                $ACTION['Permission'] = self::getModuleActionPermission($MODULE['Code'], $ACTION['Code'], $role_uuid);
                $MODULES[$MODULE['Code']]['Actions'][$ACTION['Code']] = $ACTION;
            }
        }

        return $MODULES;
    }

    public static function getModuleActionPermission($module_code, $action_code, $role_uuid = null)
    {
        if ($role_uuid == null) {
            $role_uuid = (string)auth()->user()->role_uuid;
        }

        /**
         * Check if this is the master admin of the pharmacy
         * If auth users role id is 0 then he is the master admin
         * And for the master admin we skip checking the role permissions
         * @Note: Must check if the role id was inserted by any mistake from user entry module
         */
        if ($role_uuid == "") {
            return true;
        }

        if ($action_code !== self::$ACTIONS['MODULE_ACCESS']) {
            $__module_access_permission = RolePermission::where('role_uuid', '=', $role_uuid)->where('module_code', '=', $module_code)->where('action_code', '=', self::$ACTIONS['MODULE_ACCESS']['Code']);

            if (!$__module_access_permission->exists() || (int)$__module_access_permission->first()->permission === 0) {
                return false;
            }
        }


        $__permission = RolePermission::where('role_uuid', '=', $role_uuid)->where('module_code', '=', $module_code)->where('action_code', '=', $action_code);
        if ($__permission->exists()) {
            return (int)$__permission->first()->permission === 1;
        }

        return false;
    }
}
