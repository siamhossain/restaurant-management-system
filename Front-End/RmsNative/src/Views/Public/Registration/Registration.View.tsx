import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {RegistrationStyleSheet} from "@/Static/StyleSheets/Public/Registration";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import RegisterImage from "@/Static/Images/Public/img_registration_bag.png";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "@/Routes";
import {NavigationScreenProp} from "react-navigation";

export interface IRegistrationViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface IRegistrationViewState {

}

class RegistrationView extends React.Component<IRegistrationViewProps, IRegistrationViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={RegistrationStyleSheet.root}>
                    <View style={RegistrationStyleSheet.logoContainer}>
                        <Image
                            source={RegisterImage}
                            style={RegistrationStyleSheet.logoImage}
                        />

                    </View>
                    <View style={RegistrationStyleSheet.titleContainer} >
                      <Text style={RegistrationStyleSheet.titleText}>
                          {"Sign Up"}
                      </Text>
                    </View>


                    <PrimaryTextField
                        label={"Full Name"}
                        placeholder={"Enter your name"}
                    />

                    <PrimaryTextField
                        label={"Phone Number"}
                        placeholder={"01**********"}
                    />

                    <PrimaryTextField
                        label={"Password"}
                        placeholder={"*************"}
                    />

                    <View style={RegistrationStyleSheet.submitButtonContainer}>
                        <PrimaryButton
                            style={{marginBottom: 15}}
                            label={"Register"}
                            onPress={() => this.props.navigation.navigate(
                                PUBLIC_ROUTES.LOGIN
                            )}
                        />
                    </View>

                    <View style={RegistrationStyleSheet.additionalInfoContainer}>
                        <Text style={RegistrationStyleSheet.additionalInfoText}>
                            {"Already have an account? "}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            PUBLIC_ROUTES.LOGIN
                        )}>
                            <Text style={RegistrationStyleSheet.additionalInfoLink}>
                                {"Log In"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
}

export default RegistrationView;
