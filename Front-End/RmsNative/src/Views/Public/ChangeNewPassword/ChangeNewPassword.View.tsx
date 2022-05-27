import React, {Fragment, ReactElement} from 'react';
import {ScrollView, Text, View} from "react-native";
import {ChangeNewPasswordStyleSheet} from "@/Static/StyleSheets/Public/ChangeNewPassword";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PUBLIC_ROUTES} from "@/Routes";

import {NavigationScreenProp} from "react-navigation";

export interface IForgottenPasswordViewProps {
    navigation: NavigationScreenProp<any>,
}

export interface IForgottenPasswordViewState {

}

class ChangeNewPasswordView extends React.Component<IForgottenPasswordViewProps, IForgottenPasswordViewState> {
    render(): ReactElement {
        return (
            <Fragment>

                  <ScrollView style={ChangeNewPasswordStyleSheet.root}>
                      <View style={ChangeNewPasswordStyleSheet.titleContainer}>
                          <Text style={ChangeNewPasswordStyleSheet.titleText}>
                              {"Change New Password"}
                          </Text>
                          <Text style={ChangeNewPasswordStyleSheet.subtitleText}>
                              {" Enter your registered SMS below"}
                          </Text>

                      </View>

                      <PrimaryTextField
                          label={"New Password"}
                          placeholder={"************"}
                      />

                      <PrimaryTextField
                          label={"Confirm Password"}
                          placeholder={"************"}
                      />

                      <View style={ChangeNewPasswordStyleSheet.submitButtonContainer}>
                          <PrimaryButton
                              label={"Reset Password"}
                              onPress={() => this.props.navigation.navigate(
                                  PUBLIC_ROUTES.NEW_PASSWORD_SUCCESS
                              )}
                          />
                      </View>
                  </ScrollView>


            </Fragment>
        );
    }
}

export default ChangeNewPasswordView;
