import React, {Fragment, ReactElement} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {CustomerAddressStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerAddress";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";
import {PRIVATE_ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

export interface ICustomerAddressProps {

}

export interface ICustomerAddressState {

}

const CustomerAddressScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Address"}/>
            <View style={CustomerAddressStyleSheet.addressContainer}>
                <View style={CustomerAddressStyleSheet.titleContainer}>
                    <Text style={CustomerAddressStyleSheet.title}>
                        {"Address"}
                    </Text>
                </View>

                <View style={CustomerAddressStyleSheet.InfoAddressContainer}>
                    <Text style={CustomerAddressStyleSheet.infoAddress}>
                        {"The following address will be used on the checkout page by default"}
                    </Text>
                </View>

                <View style={CustomerAddressStyleSheet.billingAddressContainer}>
                    <View>
                        <Text style={CustomerAddressStyleSheet.billingAddress}>
                            {"Billing address"}
                        </Text>
                        <Text style={CustomerAddressStyleSheet.billingAddressName}>
                            {"Arif Ahmed"}
                        </Text>
                    </View>

                    <View>
                        <View style={CustomerAddressStyleSheet.editBillingAddressButton}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(PRIVATE_ROUTES.CUSTOMER_BILLING_ADDRESS)}>
                                <PrimaryButton
                                    label={"Edit"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={CustomerAddressStyleSheet.shippingAddressContainer}>
                    <View style={CustomerAddressStyleSheet.editBillingAddressDescription}>
                        <Text style={CustomerAddressStyleSheet.shippingAddress}>
                            {"Shipping address"}
                        </Text>
                        <Text style={CustomerAddressStyleSheet.billingAddressName}>
                            {"You have not set up this type of address"}
                        </Text>
                    </View>

                    <View style={CustomerAddressStyleSheet.editBillingAddressButton}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(PRIVATE_ROUTES.CUSTOMER_SHIPPING_ADDRESS)}>
                            <PrimaryButton
                                label={"Add"}
                                 onPress={() => {
                                 }}
                                style={{backgroundColor: ColorsConfig.shippingAddressAddButton.bgColor}}
                                labelStyle={{color: ColorsConfig.shippingAddressAddButton.textColor}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Fragment>
    );
};

export {CustomerAddressScreen};

