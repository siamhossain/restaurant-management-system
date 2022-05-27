import React, {Fragment, ReactElement} from 'react';
import {View} from "react-native";
import {ChangePasswordScreen} from "@/Components/Screens/Private/Profile/ChangePassword";

class ChangePasswordView extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <Fragment>
                <View>
                    <ChangePasswordScreen/>
                </View>
            </Fragment>
        );
    }
}

export default ChangePasswordView;
