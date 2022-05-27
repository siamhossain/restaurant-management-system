import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {LoginStyleSheet} from "@/Static/StyleSheets/Public/Login";
import LoginImage from "@/Static/Images/Public/img_login_bag.png";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {GLOBAL_ROUTES, PUBLIC_ROUTES} from "@/Routes";
import {NavigationScreenProp} from "react-navigation";

export interface ILoginViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface ILoginViewState {

}

class LoginView extends React.Component<ILoginViewProps, ILoginViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={LoginStyleSheet.root}>
                    <View style={LoginStyleSheet.logoContainer}>
                        <Image
                            source={LoginImage}
                            style={LoginStyleSheet.logoImage}
                        />
                    </View>
                    <View style={LoginStyleSheet.titleContainer}>
                        <Text style={LoginStyleSheet.titleText}>
                            {"Login"}
                        </Text>
                    </View>

                    <PrimaryTextField
                        label={"Phone Number"}
                        placeholder={"01**********"}
                    />

                    <PrimaryTextField
                        label={"Password"}
                        placeholder={"*************"}
                        containerStyle={{marginBottom: 5}}
                    />

                    <View style={LoginStyleSheet.forgetPasswordContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(PUBLIC_ROUTES.FORGOTTEN_PASSWORD)}>

                            <Text style={LoginStyleSheet.forgetPasswordText}>
                                {"Forgotten Password?"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={LoginStyleSheet.submitButtonContainer}>
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(GLOBAL_ROUTES.HOME)}>
                        <PrimaryButton
                            style={{marginBottom: 15}}
                            label={"Login"}
                        />
                        </TouchableOpacity>
                    </View>

                    <View style={LoginStyleSheet.additionalInfoContainer}>
                        <Text style={LoginStyleSheet.additionalInfoText}>
                            {"Don’t have an account?"}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            PUBLIC_ROUTES.REGISTER
                        )}>
                            <Text style={LoginStyleSheet.additionalInfoLink}>
                                {"Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
}

export default LoginView;
