import React, { Fragment, ReactElement } from 'react';
import {TouchableOpacity, View} from "react-native";
import {ChangePasswordStyleSheet} from "@/Static/StyleSheets/Private/Profile/ChangePassword";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";
import {useNavigation} from "@react-navigation/core";
import {PRIVATE_ROUTES} from "@/Routes";

export interface IChangePasswordProps {

}

export interface IChangePasswordState {

}

const ChangePasswordScreen = (): ReactElement => {
    const navigation: any = useNavigation();
    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Password Change"}/>
            <View style={ChangePasswordStyleSheet.root}>
                <View style={ChangePasswordStyleSheet.inputBoxWrapper}>
                    <PrimaryTextField
                        label={"Current Password"}
                        placeholder={"*********"}
                    />
                    <PrimaryTextField
                        label={"New Password"}
                        placeholder={"*********"}
                    />
                    <PrimaryTextField
                        label={"Confirm Password"}
                        placeholder={"*********"}
                    />
                </View>

                <View style={ChangePasswordStyleSheet.submitButtonContainer}>
                    <TouchableOpacity
                        onPress={() =>navigation.navigate(PRIVATE_ROUTES.MY_PROFILE)}>
                    <PrimaryButton
                        label={"Save Password"}
                        /*onPress={() => {
                        }}*/
                    />
                    </TouchableOpacity>
                </View>
            </View>

        </Fragment>
    );
};

export { ChangePasswordScreen };
