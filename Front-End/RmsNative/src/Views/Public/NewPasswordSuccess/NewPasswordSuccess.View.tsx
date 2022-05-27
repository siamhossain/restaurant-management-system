import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import SuccessImage from "@/Static/Images/Public/img_success.png";
import {NewPasswordSuccessStyleSheet} from "@/Static/StyleSheets/Public/NewPasswordSuccess";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PUBLIC_ROUTES} from "@/Routes";

import {NavigationScreenProp} from "react-navigation";

export interface IVerificationCodeViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface IVerificationCodeViewState {

}

class NewPasswordSuccessView extends React.Component<IVerificationCodeViewProps, IVerificationCodeViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={NewPasswordSuccessStyleSheet.root}>

                    <View style={NewPasswordSuccessStyleSheet.logoContainer}>
                        <Image
                            source={SuccessImage}
                            style={NewPasswordSuccessStyleSheet.logoImage}
                        />

                    </View>
                    <View style={NewPasswordSuccessStyleSheet.titleContainer}>
                        <Text style={NewPasswordSuccessStyleSheet .titleText}>
                            {"Success"}
                        </Text>
                        <Text style={NewPasswordSuccessStyleSheet .subtitleText}>
                            {"Congratulations your password has"}
                        </Text>
                        <Text style={NewPasswordSuccessStyleSheet .subtitleText}>
                            {"been change"}
                        </Text>
                    </View>

                    <View style={NewPasswordSuccessStyleSheet.submitButtonContainer}>
                        <PrimaryButton
                            label={"Sign In"}
                            onPress={() => this.props.navigation.navigate(
                                PUBLIC_ROUTES.LOGIN
                            )}
                        />
                    </View>
                </ScrollView>

            </Fragment>
        );
    }
}

export default NewPasswordSuccessView;
