import React, {Fragment, ReactElement} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ForgottenPasswordStyleSheet} from "@/Static/StyleSheets/Public/ForgottenPassword";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PUBLIC_ROUTES} from "@/Routes";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {NavigationScreenProp} from "react-navigation";

export interface IForgottenPasswordViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface IForgottenPasswordViewState {

}

class ForgottenPasswordView extends React.Component<IForgottenPasswordViewProps, IForgottenPasswordViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={ForgottenPasswordStyleSheet.root}>
                    <View style={ForgottenPasswordStyleSheet.titleContainer}>
                        <Text style={ForgottenPasswordStyleSheet.titleText}>
                            {"Forget Password"}
                        </Text>
                        <Text style={ForgottenPasswordStyleSheet.subtitleText}>
                            {"Enter your registered Phone number"}
                        </Text>
                        <Text style={ForgottenPasswordStyleSheet.subtitleText}>
                            {"Number below"}
                        </Text>
                    </View>

                    <PrimaryTextField
                        label={"Phone Number"}
                        placeholder={"01**********"}
                    />

                    <View style={ForgottenPasswordStyleSheet.additionalInfoContainer}>
                        <Text style={ForgottenPasswordStyleSheet.additionalInfoText}>
                            {"Remember the password?"}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            PUBLIC_ROUTES.LOGIN
                        )}>
                            <Text style={ForgottenPasswordStyleSheet.additionalInfoLink}>
                                {" Sign In"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={ForgottenPasswordStyleSheet.submitButtonContainer}>
                        <PrimaryButton
                            label={"Submit"}
                            onPress={() => this.props.navigation.navigate(
                                PUBLIC_ROUTES.RECOVERY_SUCCESS
                            )}
                        />
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
}

export default ForgottenPasswordView;
