import React, { Fragment, ReactElement } from 'react';
import {ScrollView, Text, View} from "react-native";
import {CustomerOrderDetailsStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerOrderDetails";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";

const CustomerOrderDetailsScreen = (): ReactElement => {
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Order Details"}/>
            <ScrollView>
                <View style={CustomerOrderDetailsStyleSheet.orderDetailsInfoContainer}>
                    <Text style={CustomerOrderDetailsStyleSheet.orderDetailsInfoTitle}>
                        {"order #7653 was placed on October 21, 2021 and is currently On hold"}
                    </Text>

                    <View style={CustomerOrderDetailsStyleSheet.orderHeadingContainer}>
                        <Text style={CustomerOrderDetailsStyleSheet.orderHeading}>
                            {"Order details"}
                        </Text>

                        <View style={CustomerOrderDetailsStyleSheet.ordersInfoContainer}>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoHeading}>
                                {"Product"}
                            </Text>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoData}>
                                {"Fried Chicken x 3"}
                            </Text>
                        </View>
                        <View style={CustomerOrderDetailsStyleSheet.ordersInfoContainer}>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoHeading}>
                                {"Total"}
                            </Text>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoData}>
                                {"1245 tk"}
                            </Text>
                        </View>
                        <View style={CustomerOrderDetailsStyleSheet.ordersInfoContainer}>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoHeading}>
                                {"Subtotal"}
                            </Text>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoData}>
                                {"1245 tk"}
                            </Text>
                        </View>

                        <View style={CustomerOrderDetailsStyleSheet.ordersInfoContainer}>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoHeading}>
                                {"Payment method:"}
                            </Text>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoData}>
                                {"Cash Payment"}
                            </Text>
                        </View>

                        <View style={CustomerOrderDetailsStyleSheet.ordersInfoContainer}>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoHeading}>
                                {"Total:"}
                            </Text>
                            <Text style={CustomerOrderDetailsStyleSheet.orderInfoData}>
                                {"1245 tk"}
                            </Text>
                        </View>
                    </View>

                    <View style={CustomerOrderDetailsStyleSheet.billingAddressContainer}>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddressHeading}>
                            {"Billing address"}
                        </Text>

                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"Arif Ahmed"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"eDorpon"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"House#735,Road#11,Avenue#4,Mirpur"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"DOHS,Dhaka,Bangladesh"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"Dhaka Mirpur"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"+8801888015000"}
                        </Text>
                        <Text style={CustomerOrderDetailsStyleSheet.billingAddress}>
                            {"arifahmed@gmail.com"}
                        </Text>
                    </View>
                </View>
            </ScrollView>


        </Fragment>
    );
};

export { CustomerOrderDetailsScreen };
