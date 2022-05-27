import React, { ReactElement } from 'react';
import { RouterProvider } from '@/App/Services/Providers/Core/Router';
import { ROUTE_PATHS as ROUTES } from "./RoutePaths";
import FourZeroFourView from "@/Views/Errors/FourZeroFour";
import ReactSplashView from "@/Views/Global/ReactSplash";
import HomeView from "@/Views/Global/StoreFront/Home/PlutoKitchen";
import ProductDetailsView from "@/Views/Global/StoreFront/ProductDetails/PlutoKitchen";
import AboutView from "@/Views/Global/StoreFront/About/PlutoKitchen";
import BlogDetailsView from "@/Views/Global/StoreFront/BlogDetails/PlutoKitchen";
import CartView from "@/Views/Global/StoreFront/Cart/PlutoKitchen";
import ContactPageView from "@/Views/Global/StoreFront/ContactPage/PlutoKitchen";
import ShopView from "@/Views/Global/StoreFront/Shop/PlutoKitchen";
import OrderListView from "@/Views/Private/StoreFront/OrderList/PlutoKitchen";
import CheckoutView from "@/Views/Private/StoreFront/Checkout/Plutokitchen";
import AddressView from "@/Views/Private/StoreFront/Address/Plutokitchen";
import OrderDetailsView from "@/Views/Private/StoreFront/OrderDetails/PlutoKitchen";
import AccountDetailsView from "@/Views/Private/StoreFront/AccountDetails/Plutokitchen";
import BlogListView from "@/Views/Global/StoreFront/BlogList/Plutokitchen";
import GalleryImagesView from "@/Views/Global/StoreFront/GalleryImages/Plutokitchen";
import CategoryListView from "@/Views/Global/StoreFront/CategoryList/PlutoKitchen";
import DashboardView from "@/Views/Private/Admin/Dashboard";
import ForgotPasswordView from "@/Views/Global/StoreFront/ForgotPassword/PlutoKitchen";
import MyProfileView from "@/Views/Private/StoreFront/MyProfile/PlutoKitchen";
import CustomerView from "@/Views/Private/Admin/Customer";
import SupplierView from "@/Views/Private/Admin/Supplier";
import BrandView from "@/Views/Private/Admin/Brand";
import CategoryView from "@/Views/Private/Admin/Category/Category.View";
import UnitView from "@/Views/Private/Admin/Unit";
import ProductView from "@/Views/Private/Admin/Product";
import EditProfileView from "@/Views/Private/StoreFront/EditProfile";
import IngredientView from "@/Views/Private/Admin/Ingredient";
import IngredientCategoryView from "@/Views/Private/Admin/IngredientCetegory";
import UserRoleView from "@/Views/Private/Admin/UserRole";
import UserView from "@/Views/Private/Admin/User";
import StoreInformationView from "@/Views/Private/Admin/StoreInformation";
import StoreFrontSliderView from "@/Views/Private/Admin/Slider";
import SocialLinkView from "@/Views/Private/Admin/SocialLink";
import TableBookingView from "@/Views/Private/Admin/TableBooking";
import IngredientPurchaseView from "@/Views/Private/Admin/IngredientPurchase";
import IngredientUsesView from "@/Views/Private/Admin/IngredientUses";
import AccountHeadView from "@/Views/Private/Admin/AccountHead";
import AccountCategoryView from "@/Views/Private/Admin/AccountCategory";
import AccountingHistoryView from "@/Views/Private/Admin/AccountingHistory";
import ProfileView from "@/Views/Private/Admin/Profile";
import AccountingSettingView from "@/Views/Private/Admin/AccountingSetting";
import PurchaseOrderView from "@/Views/Private/Admin/PurchaseOrder";
import PurchaseOrderReturnView from "@/Views/Private/Admin/PurchaseOrderReturn";
import SalesOrderView from "@/Views/Private/Admin/SalesOrder";
import AllReportView from "@/Views/Private/Admin/AllReport";
import PurchaseSummaryView from "@/Views/Private/Admin/Reports/PurchaseSummary";
import PurchaseDetailsView from "@/Views/Private/Admin/Reports/PurchaseDetails";
import PurchaseReturnSummaryView from "@/Views/Private/Admin/Reports/PurchaseReturnSummary";
import SalesOrderReturnView from "@/Views/Private/Admin/SalesOrderReturn";
import CustomerPaymentView from "@/Views/Private/Admin/CustomerPayment";
import AdminLoginView from "@/Views/Public/AdminLogin";
import SignInView from "@/Views/Public/SignIn/PlutoKitchen";
import SignUpView from "@/Views/Public/SignUp/PlutoKitchen";
import SupplierPaymentView from "@/Views/Private/Admin/SupplierPayment";
import {LOGGED_USER, NON_LOGGED_USER} from "@/App/Middlewares/Auth";
import PurchaseReturnDetailsView from "@/Views/Private/Admin/Reports/PurchaseReturnDetails";
import LogoutView from "@/Views/Private/Admin/Logout";
import WastageView from "@/Views/Private/Admin/Wastage";
import DueInvoiceView from "@/Views/Private/Admin/DueInvoice";
import SalesSummaryView from "@/Views/Private/Admin/Reports/SalesSummary";
import SalesDetailsView from "@/Views/Private/Admin/Reports/SalesDetails";
import SalesReturnSummaryView from "@/Views/Private/Admin/Reports/SalesReturnSummary";
import SalesReturnDetailsView from "@/Views/Private/Admin/Reports/SalesReturnDetails";
import WastageSummaryView from "@/Views/Private/Admin/Reports/WastageSummary";
import WastageReportView from "@/Views/Private/Admin/Reports/WastageReport";
import CustomerPaymentSummaryView from "@/Views/Private/Admin/Reports/CustomerPaymentSummary";
import SupplierPaymentSummaryView from "@/Views/Private/Admin/Reports/SupplierPaymentSummary";
import CustomerInvoiceSummaryView from "@/Views/Private/Admin/Reports/CustomerInvoiceSummary";
import SupplierInvoiceSummaryView from "@/Views/Private/Admin/Reports/SupplierInvoiceSummary";
import GeneralLedgerView from "@/Views/Private/Admin/Reports/GeneralLedger";
import AccountingHistoryReportView from "@/Views/Private/Admin/Reports/AccountingHistoryReport";
import ProfitLossView from "@/Views/Private/Admin/Reports/ProfitLoss";
import IncomeBalanceSheetView from "@/Views/Private/Admin/Reports/IncomeBalanceSheet";
import StockReportView from "@/Views/Private/Admin/Reports/StockReport";
import IngredientPurchaseSummaryView from "@/Views/Private/Admin/Reports/IngredientPurchaseSummary";
import IngredientPurchaseDetailsView from "@/Views/Private/Admin/Reports/IngredientPurchaseDetails";
import IngredientUsesSummaryView from "@/Views/Private/Admin/Reports/IngredientUsesSummary";
import IngredientUsageDetailsView from "@/Views/Private/Admin/Reports/IngredientUsageDetails";
import BookingFoodToKitchenView from "@/Views/Private/Admin/BookingFoodToKitchen";
import SalesOrderToKitchenView from "@/Views/Private/Admin/SalesOrderToKitchen";


export const Routes = (): ReactElement => {
    return (
        <RouterProvider.BrowserRouter>
            <RouterProvider.Switch>

                {/*** Global Route ***/}
                <RouterProvider.Route exact path={ROUTES.GLOBAL.ROOT} component={HomeView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.PRODUCT_DETAILS} component={ProductDetailsView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.REACT_SPLASH} component={ReactSplashView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.ABOUT_US} component={AboutView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.BLOG_DETAILS} component={BlogDetailsView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.BLOG_LIST} component={BlogListView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.GALLERY_IMAGES} component={GalleryImagesView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.CART} component={CartView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.CONTACT} component={ContactPageView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.SHOP} component={ShopView}/>
                <RouterProvider.Route exact path={ROUTES.GLOBAL.CATEGORY_LIST} component={CategoryListView}/>

                {/*Public Routes */}
                <RouterProvider.Route exact path={ROUTES.PUBLIC.SIGN_IN} component={SignInView}/>
                <RouterProvider.Route exact path={ROUTES.PUBLIC.SIGN_UP} component={SignUpView}/>
                <RouterProvider.Route exact path={ROUTES.PUBLIC.FORGOT_PASSWORD} component={ForgotPasswordView}/>
                <RouterProvider.Route exact path={ROUTES.PUBLIC.ADMIN.ROOT} component={AdminLoginView} middleware={[NON_LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PUBLIC.ADMIN.LOGIN} component={AdminLoginView} middleware={[NON_LOGGED_USER]}/>

                {/*Private Routes*/}
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ORDER_LIST} middleware={[LOGGED_USER]} component={OrderListView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.CHECKOUT} middleware={[LOGGED_USER]} component={CheckoutView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADDRESS} middleware={[LOGGED_USER]} component={AddressView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ACCOUNT_DETAILS} middleware={[LOGGED_USER]} component={AccountDetailsView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ORDER_DETAILS} middleware={[LOGGED_USER]} component={OrderDetailsView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.MY_PROFILE}  middleware={[LOGGED_USER]} component={MyProfileView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.EDIT_PROFILE} middleware={[LOGGED_USER]} component={EditProfileView}/>

                {/*Admin Routes*/}
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ROOT} component={DashboardView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.DASHBOARD} component={DashboardView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.LOGOUT} component={LogoutView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ROOT} component={DashboardView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.CUSTOMER} middleware={[LOGGED_USER]} component={CustomerView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SUPPLIER} middleware={[LOGGED_USER]} component={SupplierView}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.BRAND} component={BrandView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.CATEGORY} component={CategoryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.UNIT} component={UnitView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRODUCT} component={ProductView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.INGREDIENT} component={IngredientView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.INGREDIENT_CATEGORY} component={IngredientCategoryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.USER_ROLE} component={UserRoleView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.USER} component={UserView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.STORE_INFORMATION} component={StoreInformationView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SLIDER} component={StoreFrontSliderView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SOCIAL_LINK} component={SocialLinkView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.TABLE_BOOKING} component={TableBookingView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.INGREDIENT_PURCHASE} component={IngredientPurchaseView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.INGREDIENT_USES} component={IngredientUsesView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ACCOUNT_HEAD} component={AccountHeadView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ACCOUNT_CATEGORY} component={AccountCategoryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.INCOME} component={() => <AccountingHistoryView type={'Income'} />} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.EXPENSE} component={() => <AccountingHistoryView type={'Expense'} />} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PROFILE} component={ProfileView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ACCOUNTING_SETTINGS} component={AccountingSettingView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PURCHASE_ORDER} component={PurchaseOrderView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PURCHASE_ORDER_RETURN} component={PurchaseOrderReturnView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SALES_ORDER} component={SalesOrderView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SALES_ORDER_RETURN} component={SalesOrderReturnView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.CUSTOMER_PAYMENT} component={CustomerPaymentView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SUPPLIER_PAYMENT} component={SupplierPaymentView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.WASTAGE} component={WastageView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.DUE_INVOICE} component={DueInvoiceView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.TABLE_BOOK_FOOD_KITCHEN} component={BookingFoodToKitchenView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.SALES_FOOD_KITCHEN} component={SalesOrderToKitchenView} middleware={[LOGGED_USER]}/>

                {/*Report Section*/}

                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.ALL_REPORT} component={AllReportView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_SUMMARY_REPORT} component={PurchaseSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_DETAILS_REPORT} component={PurchaseDetailsView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_SUMMARY_REPORT} component={PurchaseReturnSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.PURCHASE_RETURN_DETAILS_REPORT} component={PurchaseReturnDetailsView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_SUMMARY_REPORT} component={SalesSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_DETAILS_REPORT} component={SalesDetailsView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_RETURN_SUMMARY_REPORT} component={SalesReturnSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SALES_RETURN_DETAILS_REPORT} component={SalesReturnDetailsView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_SUMMARY_REPORT} component={WastageSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.WASTAGE_DETAILS_REPORT} component={WastageReportView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_PAYMENT_SUMMARY} component={CustomerPaymentSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_PAYMENT_SUMMARY} component={SupplierPaymentSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.CUSTOMER_INVOICE_SUMMARY} component={CustomerInvoiceSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.SUPPLIER_INVOICE_SUMMARY} component={SupplierInvoiceSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.GENERAL_LEDGER} component={GeneralLedgerView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.ACCOUNTING_HISTORY} component={AccountingHistoryReportView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.PROFIT_LOSS} component={ProfitLossView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.INCOME_BALANCE_SHEET} component={IncomeBalanceSheetView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.STOCK_REPORT} component={StockReportView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_PURCHASE_SUMMARY} component={IngredientPurchaseSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_PURCHASE_DETAILS} component={IngredientPurchaseDetailsView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_USAGE_SUMMARY} component={IngredientUsesSummaryView} middleware={[LOGGED_USER]}/>
                <RouterProvider.Route exact path={ROUTES.PRIVATE.ADMIN.PRINTABLE_REPORTS.INGREDIENT_USAGE_DETAILS} component={IngredientUsageDetailsView} middleware={[LOGGED_USER]}/>

                {/* 404 Error Page */}
                <RouterProvider.Route exact path={"*"} component={FourZeroFourView}/>

            </RouterProvider.Switch>
        </RouterProvider.BrowserRouter>
    );
};
