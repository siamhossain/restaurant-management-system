import React, { Fragment, ReactElement } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {CustomerAboutStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerAbout";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {useNavigation} from "@react-navigation/core";
import {PRIVATE_ROUTES} from "@/Routes";

export interface ICustomerProfileViewProps {

}

export interface ICustomerProfileViewState {

}

const CustomerAboutScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"My Profile"}/>
            <View style={CustomerAboutStyleSheet.root}>
                <View style={CustomerAboutStyleSheet.aboutInfo}>
                    <View style={CustomerAboutStyleSheet.aboutInfoContainer}>
                        <Text style={CustomerAboutStyleSheet.name}>
                            {"Full Name"}
                        </Text>

                        <Text style={CustomerAboutStyleSheet.fullName}>
                            {"Arif Ahmed"}
                        </Text>
                    </View>

                    <View style={CustomerAboutStyleSheet.aboutInfoContainer}>
                        <Text style={CustomerAboutStyleSheet.contactNumber}>
                            {"Contact Number"}
                        </Text>
                        <Text style={CustomerAboutStyleSheet.phoneNumber}>
                            {"01569874512"}
                        </Text>
                    </View>

                    <View style={CustomerAboutStyleSheet.aboutInfoContainer}>
                        <Text style={CustomerAboutStyleSheet.gender}>
                            {"Gender"}
                        </Text>
                        <Text style={CustomerAboutStyleSheet.genderInfo}>
                            {"Male"}
                        </Text>
                    </View>
                </View>
                <View style={CustomerAboutStyleSheet.buttonContainer}>
                    <View style={CustomerAboutStyleSheet.submitButtonContainer}>
                        <TouchableOpacity
                        onPress={() =>navigation.navigate(PRIVATE_ROUTES.EDIT_PROFILE)}>
                            <PrimaryButton
                                label={"Edit Profile"}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={CustomerAboutStyleSheet.submitButtonContainer}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(PRIVATE_ROUTES.CHANGE_PASSWORD)}>
                        <PrimaryButton
                            label={"Change password"}
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

export { CustomerAboutScreen };


