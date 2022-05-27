import React, { Fragment, ReactElement } from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import RocketLogo from "@/Static/Images/Global/logo-rocket.png"
import BkashLogo from "@/Static/Images/Global/logo_bkash.png"
import NagadLogo from "@/Static/Images/Global/logo_nagad.png"
import {PaymentMethodStyleSheet} from "@/Static/StyleSheets/Global/PaymentMethod";
import {CustomerShippingAddressStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerShippingAddress";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {GLOBAL_ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";


export interface IPaymentMethodProps {

}

export interface IPaymentMethodState {

}

const PaymentMethodScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ScrollView>
                <View style={PaymentMethodStyleSheet.paymentContainer}>
                    <View style={PaymentMethodStyleSheet.selectDeliveryTitle}>
                        <Text style={PaymentMethodStyleSheet.selectDeliveryTitleText}>
                            {"Select Delivery Address"}
                        </Text>
                        <Text style={PaymentMethodStyleSheet.selectDeliveryTitleButton}>
                            {"Add New"}
                        </Text>
                    </View>
                    <View style={PaymentMethodStyleSheet.addressContainer}>
                        <View style={PaymentMethodStyleSheet.selectAddress}>
                            <View style={PaymentMethodStyleSheet.selectRadioButton}>

                            </View>
                            <View style={PaymentMethodStyleSheet.addressDetails}>
                                <Text style={PaymentMethodStyleSheet.addressDetailsTextTitle}>
                                    {"Home Address"}
                                </Text>
                                <Text style={PaymentMethodStyleSheet.addressDetailsText}>
                                    {"House#735,Road#11,Avenue#4,Mirpur"}
                                </Text>
                                <Text style={PaymentMethodStyleSheet.addressDetailsText}>
                                    {"Mirpur Dhaka, Bangladesh"}
                                </Text>
                            </View>
                        </View>
                        <View style={PaymentMethodStyleSheet.Address}>
                            <View style={PaymentMethodStyleSheet.RadioButton}>

                            </View>
                            <View style={PaymentMethodStyleSheet.otherAddressDetails}>
                                <Text style={PaymentMethodStyleSheet.otherAddressDetailsTextTitle}>
                                    {"Home Address"}
                                </Text>
                                <Text style={PaymentMethodStyleSheet.otherAddressDetailsText}>
                                    {"House#735,Road#11,Avenue#4,Mirpur"}
                                </Text>
                                <Text style={PaymentMethodStyleSheet.otherAddressDetailsText}>
                                    {"Mirpur Dhaka, Bangladesh"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={PaymentMethodStyleSheet.paymentMethodContainer}>
                        <View style={PaymentMethodStyleSheet.paymentMethodTitle}>
                            <Text style={PaymentMethodStyleSheet.paymentMethodTitleText}>
                                {"Select Payment Method"}
                            </Text>
                        </View>
                        <View style={PaymentMethodStyleSheet.allPaymentMethodLogo}>
                            <View style={PaymentMethodStyleSheet.paymentLogo}>
                                <Image
                                    source={RocketLogo}
                                    style={PaymentMethodStyleSheet.rocketImage}
                                />
                                <Text style={PaymentMethodStyleSheet.logoName}>
                                    {"Rocket"}
                                </Text>
                            </View>

                            <View style={PaymentMethodStyleSheet.paymentLogo}>
                                <Image
                                    source={BkashLogo}
                                    style={PaymentMethodStyleSheet.bkashImage}
                                />
                                <Text style={PaymentMethodStyleSheet.logoName}>
                                    {"Bkash"}
                                </Text>
                            </View>

                            <View style={PaymentMethodStyleSheet.paymentLogo}>
                                <Image
                                    source={NagadLogo}
                                    style={PaymentMethodStyleSheet.nagadImage}
                                />
                                <Text style={PaymentMethodStyleSheet.logoName}>
                                    {"Nagad"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={CustomerShippingAddressStyleSheet.inputBoxWrapper}>
                        <PrimaryTextField
                            label={"Card Name"}
                        />
                        <PrimaryTextField
                            label={"Card Number"}
                        />
                        <PrimaryTextField
                            label={"Expiration"}
                        />
                        <PrimaryTextField
                            label={"CVV"}
                        />
                    </View>

                    <View style={PaymentMethodStyleSheet.paymentButton}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(GLOBAL_ROUTES.ORDER_PLACE_SUCCESSFUL)}>
                            <PrimaryButton
                                label={"Payment Now"}
                               /* onPress={() => {
                                }}*/
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { PaymentMethodScreen };
