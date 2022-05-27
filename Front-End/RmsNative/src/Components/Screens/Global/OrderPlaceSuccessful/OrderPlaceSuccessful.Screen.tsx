import React, { Fragment, ReactElement } from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import OrderSuccessfulImage from "@/Static/Images/Global/img_order_successful.png"
import {OrderPlaceSuccessfulStyleSheet} from "@/Static/StyleSheets/Global/OrderPlaceSuccessful";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {GLOBAL_ROUTES, PUBLIC_ROUTES, ROUTES} from "@/Routes";
import {useNavigation} from "@react-navigation/core";

export interface IOrderPlaceSuccessfulProps {

}

export interface IOrderPlaceSuccessfulState {

}


const OrderPlaceSuccessfulScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <ScrollView>
                <View style={OrderPlaceSuccessfulStyleSheet.orderSuccessfulContainer}>
                    <View style={OrderPlaceSuccessfulStyleSheet.OrderSuccessfulImage}>
                        <Image
                            source={OrderSuccessfulImage}
                            style={OrderPlaceSuccessfulStyleSheet.Image}
                            />
                    </View>
                    <View style={OrderPlaceSuccessfulStyleSheet.orderSuccessfulTitle}>
                        <Text style={OrderPlaceSuccessfulStyleSheet.textTitle}>
                            {"Order Placed Successfully"}
                        </Text>
                        <Text style={OrderPlaceSuccessfulStyleSheet.textInfo}>
                            {"Thank you! your order has been placed"}
                        </Text>
                        <Text style={OrderPlaceSuccessfulStyleSheet.textInfo}>
                            {"follow the order in profile"}
                        </Text>
                    </View>
                    <View style={OrderPlaceSuccessfulStyleSheet.viewOrderButton}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(ROUTES.PRIVATE.CUSTOMER_ORDER_DETAILS)}>
                            <PrimaryButton
                                label={"VIEW ORDER"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={OrderPlaceSuccessfulStyleSheet.continueShopping}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(GLOBAL_ROUTES.HOME)}>
                            <Text style={OrderPlaceSuccessfulStyleSheet.continueShoppingText}>
                                {"Continue Shopping"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { OrderPlaceSuccessfulScreen };
