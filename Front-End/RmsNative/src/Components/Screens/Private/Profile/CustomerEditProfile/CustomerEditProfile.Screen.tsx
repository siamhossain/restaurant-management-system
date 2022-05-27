import React, { Fragment, ReactElement } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {CustomerEditProfileStyleSheet} from "@/Static/StyleSheets/Private/Profile/CustomerEditProfile";
import {PrimaryTextField} from "@/Components/Core/PrimaryTextField";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";
import {PRIVATE_ROUTES} from "@/Routes";
import { RadioButton } from 'react-native-paper';
import {useNavigation} from "@react-navigation/core";

export interface ICustomerEditProfileProps {

}

export interface ICustomerEditProfileState {

}


const CustomerEditProfileScreen = (): ReactElement => {
    const navigation: any = useNavigation();

    const [checked, setChecked] = React.useState('first');

    return (
        <Fragment>
            <PrimaryHeaderScreen title={"Edit Profile"}/>
            <View style={CustomerEditProfileStyleSheet.root}>
                <View style={CustomerEditProfileStyleSheet.inputBoxWrapper}>
                    <PrimaryTextField
                        label={"Full Name"}
                        placeholder={"Arif Ahmed"}
                    />
                    <PrimaryTextField
                        label={"Contact Number"}
                        placeholder={"015698789"}
                    />
                    <View style={CustomerEditProfileStyleSheet.selectGenderRadioButton}>
                        <Text style={CustomerEditProfileStyleSheet.selectGenderRadioButtonTitle}>
                            {"Gender"}
                        </Text>
                        <View style={CustomerEditProfileStyleSheet.gender}>
                            <View style={{flexDirection: "row", alignItems: "center", marginRight: 20}}>
                                <RadioButton
                                    value="first"
                                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('first')}
                                />
                                <Text>Male</Text>
                            </View>

                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <RadioButton
                                    value="first"
                                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('first')}
                                />
                                <Text>Male</Text>
                            </View>
                         </View>
                    </View>
                </View>
                <View style={CustomerEditProfileStyleSheet.submitButtonContainer}>
                    <TouchableOpacity
                        onPress={() =>navigation.navigate(PRIVATE_ROUTES.MY_PROFILE)}>
                    <PrimaryButton
                        label={"Save Profile"}
                      /*  onPress={() => {
                        }}*/
                    />
                    </TouchableOpacity>
                </View>
            </View>
        </Fragment>
    );
};

export { CustomerEditProfileScreen };
