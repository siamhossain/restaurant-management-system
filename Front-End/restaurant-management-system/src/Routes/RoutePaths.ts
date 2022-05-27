import {usePrefix, useAdminPrefix} from "./Prefixes";

const RoutePaths = {
    GLOBAL: {
        ROOT: usePrefix.global(),
        REACT_SPLASH: usePrefix.global('/react-app'),
        PRODUCT_DETAILS: usePrefix.global('product-details'),
        ABOUT_US: usePrefix.global('about'),
        BLOG_DETAILS: usePrefix.global('/blog-details'),
        CART: usePrefix.global('/cart'),
        CONTACT: usePrefix.global('/contact'),
        SHOP: usePrefix.global('/shop'),
        BLOG_LIST: usePrefix.global('/blog-list'),
        GALLERY_IMAGES: usePrefix.global('/gallery-images'),
        CATEGORY_LIST: usePrefix.global('/categories'),
    },
    PUBLIC: {
        ROOT: usePrefix.public(),
        LOGIN: usePrefix.public('/login'),
        SIGN_IN: usePrefix.public('/sign-in'),
        SIGN_UP: usePrefix.public('/sign-up'),
        FORGOT_PASSWORD: usePrefix.public('/forgot-password'),

        ADMIN: {
            ROOT: useAdminPrefix.public('/'),
            LOGIN: useAdminPrefix.public('/login'),
        }
    },
       PRIVATE: {
        ROOT: usePrefix.private(),
        ORDER_LIST: usePrefix.private('/order-list'),
        ORDER_DETAILS: usePrefix.private('/order-details'),

        ADMIN: {
            ROOT: useAdminPrefix.private(''),
            LOGOUT: useAdminPrefix.private('/logout'),
            DASHBOARD: useAdminPrefix.private('/dashboard'),
            CUSTOMER: useAdminPrefix.private('/customer'),
            SUPPLIER: useAdminPrefix.private('/supplier'),
            BRAND: useAdminPrefix.private('/brand'),
            CATEGORY: useAdminPrefix.private('/category'),
            UNIT: useAdminPrefix.private('/unit'),
            PRODUCT: useAdminPrefix.private('/product'),
            INGREDIENT_CATEGORY: useAdminPrefix.private('/ingredient-category'),
            INGREDIENT: useAdminPrefix.private('/ingredient'),
            USER_ROLE: useAdminPrefix.private('/user-role'),
            USER: useAdminPrefix.private('/user'),
            STORE_INFORMATION: useAdminPrefix.private('/store-information'),
            SLIDER: useAdminPrefix.private('/slider'),
            BANNER: useAdminPrefix.private('/banner'),
            SOCIAL_LINK: useAdminPrefix.private('/social-link'),
            TABLE_BOOKING: useAdminPrefix.private('/table-booking'),
            INGREDIENT_PURCHASE: useAdminPrefix.private('/ingredient-purchase'),
            INGREDIENT_USES: useAdminPrefix.private('/ingredient-uses'),
            ACCOUNTING_HISTORY: useAdminPrefix.private('/accounting-histories'),
            ACCOUNT_HEAD: useAdminPrefix.private('/account-head'),
            ACCOUNT_CATEGORY: useAdminPrefix.private('/account-category'),
            INCOME: useAdminPrefix.private('/income'),
            EXPENSE: useAdminPrefix.private('/expense'),
            PROFILE: useAdminPrefix.private('/dashboard/profile'),
            ACCOUNTING_SETTINGS: useAdminPrefix.private('/accounting-settings'),
            PURCHASE_ORDER: useAdminPrefix.private('/purchase-order'),
            PURCHASE_ORDER_RETURN: useAdminPrefix.private('/purchase-order-return'),
            SALES_ORDER: useAdminPrefix.private('/sales-order'),
            SALES_ORDER_RETURN: useAdminPrefix.private('/sales-order-return'),
            ALL_REPORT: useAdminPrefix.private('/all-report'),
            CUSTOMER_PAYMENT: useAdminPrefix.private('/customer-payment'),
            SUPPLIER_PAYMENT: useAdminPrefix.private('/supplier-payment'),
            WASTAGE: useAdminPrefix.private('/wastage'),
            DUE_INVOICE: useAdminPrefix.private('/due-invoice'),
            TABLE_BOOK_FOOD_KITCHEN: useAdminPrefix.private('/table-booking-food-to-kitchen'),
            SALES_FOOD_KITCHEN: useAdminPrefix.private('/sales-food-to-kitchen'),

            PRINTABLE_REPORTS: {
                PURCHASE_SUMMARY_REPORT: useAdminPrefix.private('/purchase-summary-report'),
                PURCHASE_DETAILS_REPORT: useAdminPrefix.private('/purchase-details-report'),
                PURCHASE_RETURN_SUMMARY_REPORT: useAdminPrefix.private('/purchase-return-summary-report'),
                PURCHASE_RETURN_DETAILS_REPORT: useAdminPrefix.private('/purchase-return-details-report'),

                SALES_SUMMARY_REPORT: usePrefix.private('sales-summary-report'),
                SALES_DETAILS_REPORT: usePrefix.private('sales-details-report'),
                SALES_RETURN_SUMMARY_REPORT: usePrefix.private('sales-return-summary-report'),
                SALES_RETURN_DETAILS_REPORT: usePrefix.private('sales-return-details-report'),

                WASTAGE_SUMMARY_REPORT: useAdminPrefix.private('/wastage-summary-report'),
                WASTAGE_DETAILS_REPORT: useAdminPrefix.private('/wastage-details-report'),

                CUSTOMER_PAYMENT_SUMMARY: useAdminPrefix.private('/customer-payment-summary'),
                SUPPLIER_PAYMENT_SUMMARY: useAdminPrefix.private('/supplier-payment-summary'),

                CUSTOMER_INVOICE_SUMMARY: useAdminPrefix.private('/customer-invoice-summary'),
                SUPPLIER_INVOICE_SUMMARY: useAdminPrefix.private('/supplier-invoice-summary'),


                GENERAL_LEDGER: useAdminPrefix.private('/general-ledger'),
                ACCOUNTING_HISTORY: useAdminPrefix.private('/accounting-history'),
                PROFIT_LOSS: useAdminPrefix.private('/profit-loss'),
                INCOME_BALANCE_SHEET: useAdminPrefix.private('/income-balance-Sheet'),
                STOCK_REPORT: useAdminPrefix.private('/stock-report'),

                CUSTOMER_LIST: useAdminPrefix.private('/customer-list'),
                SUPPLIER_LIST: useAdminPrefix.private('/supplier-list'),
                INGREDIENT_PURCHASE_SUMMARY: useAdminPrefix.private('/ingredient-purchase-summary'),
                INGREDIENT_PURCHASE_DETAILS: useAdminPrefix.private('/ingredient-purchase-details'),
                INGREDIENT_USAGE_SUMMARY: useAdminPrefix.private('/ingredient-usage-summary'),
                INGREDIENT_USAGE_DETAILS: useAdminPrefix.private('/ingredient-usage-details'),


            }

        },

        CHECKOUT: usePrefix.private('/checkout'),
        ADDRESS: usePrefix.private('/address'),
        ACCOUNT_DETAILS: usePrefix.private('/account-details'),
        MY_PROFILE: usePrefix.private('/profile'),
        EDIT_PROFILE: usePrefix.private('/profile/edit'),
    },
};

export {RoutePaths as ROUTE_PATHS};
