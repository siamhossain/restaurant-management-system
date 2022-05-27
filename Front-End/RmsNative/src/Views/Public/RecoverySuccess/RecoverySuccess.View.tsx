import React, {Fragment, ReactElement} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {RecoverySuccessStyleSheet} from "@/Static/StyleSheets/Public/RecoverySuccess";
import {PUBLIC_ROUTES} from "@/Routes";
import SuccessImage from "@/Static/Images/Public/img_success.png";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";


class RecoverySuccessView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <ScrollView style={RecoverySuccessStyleSheet.root}>

                    <View style={RecoverySuccessStyleSheet.logoContainer}>
                        <Image
                            source={SuccessImage}
                            style={RecoverySuccessStyleSheet.logoImage}
                        />

                    </View>
                    <View style={RecoverySuccessStyleSheet.titleContainer}>
                        <Text style={RecoverySuccessStyleSheet .titleText}>
                            {"Success"}
                        </Text>
                        <Text style={RecoverySuccessStyleSheet .subtitleText}>
                            {"Please check  your message for"}
                        </Text>
                        <Text style={RecoverySuccessStyleSheet .subtitleText}>
                            {"Create a new password"}
                        </Text>
                    </View>

                    <View style={RecoverySuccessStyleSheet.additionalInfoContainer}>
                        <Text style={RecoverySuccessStyleSheet.additionalInfoText}>
                            {"Can't get SMS?"}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            PUBLIC_ROUTES.LOGIN
                        )}>
                            <Text style={RecoverySuccessStyleSheet.additionalInfoLink}>
                                {" Resend"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={RecoverySuccessStyleSheet.submitButtonContainer}>
                        <PrimaryButton
                            label={"Submit"}
                            // onPress={() => {
                            // }}
                            onPress={() => this.props.navigation.navigate(
                                PUBLIC_ROUTES.VERIFICATION_CODE
                            )}
                        />
                    </View>
                </ScrollView>


            </Fragment>
        );
    }
}

export default RecoverySuccessView;
