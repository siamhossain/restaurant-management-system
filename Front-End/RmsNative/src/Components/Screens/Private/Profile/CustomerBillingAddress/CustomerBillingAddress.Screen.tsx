import React, { Fragment, ReactElement } from 'react';
import {ScrollView, Text, View} from "react-native";
import {CustomerBillingAddressStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerBillingAddress";
import AntIcon from "react-native-vector-icons/AntDesign";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";
const CustomerBillingAddressScreen = (): ReactElement => {
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Billing Address"}/>
            <ScrollView>
                <View style={CustomerBillingAddressStyleSheet.billingAddressContainer}>

                    <View style={CustomerBillingAddressStyleSheet.titleInfoContainer}>
                        <Text style={CustomerBillingAddressStyleSheet.titleInfo}>
                            {"Billing address"}
                        </Text>
                    </View>

                    <View style={CustomerBillingAddressStyleSheet.inputBoxWrapper}>
                        <PrimaryTextField
                            label={"First Name*"}
                            placeholder={"Arif"}
                        />
                        <PrimaryTextField
                            label={"Last Name*"}
                            placeholder={"Ahmed"}
                        />
                        <PrimaryTextField
                            label={"Phone Number"}
                        />
                        <PrimaryTextField
                            label={"Email"}
                        />
                        <PrimaryTextField
                            label={"Address"}
                        />
                        <PrimaryTextField
                            label={"Company Name (optional)"}
                        />
                    </View>

                    <View style={CustomerBillingAddressStyleSheet.saveAddressButtonContainer}>
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

export { CustomerBillingAddressScreen };
