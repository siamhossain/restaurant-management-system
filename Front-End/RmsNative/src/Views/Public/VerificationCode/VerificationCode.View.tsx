import React, {Fragment, ReactElement} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {VerificationCodeStyleSheet} from "@/Static/StyleSheets/Public/VerificationCode";
import {PUBLIC_ROUTES} from "@/Routes";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";

import {NavigationScreenProp} from "react-navigation";

export interface IVerificationCodeViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface IVerificationCodeViewState {

}


class VerificationCodeView extends React.Component<IVerificationCodeViewProps, IVerificationCodeViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={VerificationCodeStyleSheet.root}>
                    <View style={VerificationCodeStyleSheet.titleContainer}>
                        <Text style={VerificationCodeStyleSheet .titleText}>
                            {"Confirmation"}
                        </Text>
                        <Text style={VerificationCodeStyleSheet .subtitleText}>
                            {"Please type the verification code"}
                        </Text>
                        <Text style={VerificationCodeStyleSheet.numberText}>
                            {"sent to   01584587514"}
                        </Text>
                    </View>

                    <View style={VerificationCodeStyleSheet.codeContainer}>
                        <PrimaryTextField
                            placeholder={"Enter 4 digits code"}
                            keyboardType={"numeric"}
                            inputStyle={{
                                textAlign: "center",
                                fontSize: 15,
                            }}
                        />

                    </View>


                    <View style={VerificationCodeStyleSheet.additionalInfoContainer}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={VerificationCodeStyleSheet.additionalInfoLink}>
                                {" RESEND CODE"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={VerificationCodeStyleSheet.submitButtonContainer}>
                        <PrimaryButton
                            label={"VERIFY"}
                            // onPress={() => {
                            // }}
                            onPress={() => this.props.navigation.navigate(
                                PUBLIC_ROUTES.CHANGE_NEW_PASSWORD
                            )}
                        />
                    </View>
                </ScrollView>

            </Fragment>
        );
    }
}

export default VerificationCodeView;
