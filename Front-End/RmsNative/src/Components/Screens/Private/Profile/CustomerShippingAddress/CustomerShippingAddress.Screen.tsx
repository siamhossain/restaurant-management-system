import React, { Fragment, ReactElement } from 'react';
import {ScrollView, Text, View} from "react-native";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {CustomerShippingAddressStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerShippingAddress";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";

const CustomerShippingAddressScreen = (): ReactElement => {
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Shipping Address"}/>
            <ScrollView>
                <View style={CustomerShippingAddressStyleSheet.shippingAddressContainer}>
                    <View style={CustomerShippingAddressStyleSheet.titleInfoContainer}>
                        <Text style={CustomerShippingAddressStyleSheet.titleInfo}>
                            {"Shipping address"}
                        </Text>
                    </View>

                    <View style={CustomerShippingAddressStyleSheet.inputBoxWrapper}>
                        <PrimaryTextField
                            label={"First Name*"}
                        />
                        <PrimaryTextField
                            label={"Last Name*"}
                        />
                        <PrimaryTextField
                            label={"Address"}
                        />
                        <PrimaryTextField
                            label={"Company Name (optional)"}
                        />
                    </View>

                    <View style={CustomerShippingAddressStyleSheet.saveAddressButtonContainer}>
                        <PrimaryButton
                            label={"Save Address"}
                            onPress={() => {
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { CustomerShippingAddressScreen };
