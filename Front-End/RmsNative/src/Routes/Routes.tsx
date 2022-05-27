import React, {Fragment, ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from "@/Routes/RouteNames";
import AccountSplashView from "@/Views/Public/AccountSplash";
import RegistrationView from "@/Views/Public/Registration";
import LoginView from "@/Views/Public/Login";
import ForgottenPasswordView from "@/Views/Public/ForgottenPassword";
import RecoverySuccessView from "@/Views/Public/RecoverySuccess";
import VerificationCodeView from "@/Views/Public/VerificationCode";
import ChangeNewPasswordView from "@/Views/Public/ChangeNewPassword";
import NewPasswordSuccessView from "@/Views/Public/NewPasswordSuccess";
import HomeView from "@/Views/Global/Home";
import CategoryListView from "@/Views/Global/CategoryList";
import CustomerProfileView from "@/Views/Private/Profile/CustomerProfile";
import MyProfileView from "@/Views/Private/Profile/CustomerAbout";
import CustomerEditProfileView from "@/Views/Private/Profile/CustomerEditProfile";
import ChangePasswordView from "@/Views/Private/Profile/ChangePassword";
import CustomerOrderListView from "@/Views/Private/Profile/CustomerOrderList";
import CustomerOrderDetailsView from "@/Views/Private/Profile/CustomerOrderDetails";
import CustomerBillingAddressView from "@/Views/Private/Profile/CustomerBillingAddress";
import CustomerShippingAddressView from "@/Views/Private/Profile/CustomerShippingAddress";
import CustomerAddressView from "@/Views/Private/Profile/CustomerAddress";
import NearbyRestaurantsView from "@/Views/Global/SetupWizard/NearbyRestaurants";
import SelectFavouriteMenuView from "@/Views/Global/SetupWizard/SelectFavouriteMenu";
import GoodFoodCheapPriceView from "@/Views/Global/SetupWizard/GoodFoodCheapPrice";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {SideDrawerScreen} from "@/Components/Screens/Global/SideDrawer";
import ProductDetailsView from "@/Views/Global/ProductDetails";
import OrderPlaceSuccessfulView from "@/Views/Global/OrderPlaceSuccessful";
import PaymentMethodView from "@/Views/Global/PaymentMethod";
import ProductCartView from "@/Views/Global/ProductCart";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Routes = (): ReactElement => {
    return (
        <Fragment>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={() => <SideDrawerScreen/>}
                    screenOptions={{headerShown: false}}
                    initialRouteName={ROUTES.GLOBAL.NAVIGATION_NAME}>
                    <Drawer.Screen name={ROUTES.GLOBAL.NAVIGATION_NAME} component={() => (
                        <Stack.Navigator
                            screenOptions={{headerShown: false}}
                            initialRouteName={
                               /* ROUTES.GLOBAL.HOME*/
                                ROUTES.GLOBAL.SETUP_WIZARD.STEP1
                            }>
                            {/*Global Routes*/}

                            <Stack.Screen name={ROUTES.GLOBAL.ROOT} component={AccountSplashView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.HOME} component={HomeView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.SETUP_WIZARD.STEP1} component={NearbyRestaurantsView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.SETUP_WIZARD.STEP2} component={SelectFavouriteMenuView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.SETUP_WIZARD.STEP3} component={GoodFoodCheapPriceView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.PRODUCT_DETAILS} component={ProductDetailsView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.ORDER_PLACE_SUCCESSFUL} component={OrderPlaceSuccessfulView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.PRODUCT_CART} component={ProductCartView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.PAYMENT_METHOD} component={PaymentMethodView}/>
                            <Stack.Screen name={ROUTES.GLOBAL.CATEGORY_LIST} component={CategoryListView}/>

                            {/*Private Routes*/}
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_PROFILE} component={CustomerProfileView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.MY_PROFILE} component={MyProfileView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.EDIT_PROFILE} component={CustomerEditProfileView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CHANGE_PASSWORD} component={ChangePasswordView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_ORDER_LIST} component={CustomerOrderListView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_ORDER_DETAILS}
                                          component={CustomerOrderDetailsView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_BILLING_ADDRESS}
                                          component={CustomerBillingAddressView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_SHIPPING_ADDRESS}
                                          component={CustomerShippingAddressView}/>
                            <Stack.Screen name={ROUTES.PRIVATE.CUSTOMER_ADDRESS} component={CustomerAddressView}/>


                            {/*  Public Routes*/}
                            <Stack.Screen name={ROUTES.PUBLIC.REGISTER} component={RegistrationView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.LOGIN} component={LoginView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.FORGOTTEN_PASSWORD} component={ForgottenPasswordView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.RECOVERY_SUCCESS} component={RecoverySuccessView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.VERIFICATION_CODE} component={VerificationCodeView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.CHANGE_NEW_PASSWORD} component={ChangeNewPasswordView}/>
                            <Stack.Screen name={ROUTES.PUBLIC.NEW_PASSWORD_SUCCESS} component={NewPasswordSuccessView}/>
                        </Stack.Navigator>
                    )}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </Fragment>
    );
};

export {Routes};
