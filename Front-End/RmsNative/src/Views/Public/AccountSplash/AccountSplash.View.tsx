import React, { Fragment, ReactElement } from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import {AccountSplashStyleSheet} from "@/Static/StyleSheets/Public/AccountSplash";
import BagImage from "@/Static/Images/Public/img_accounting_splash_bag.png";
import {PrimaryButton} from "@/Components/Core/PrimaryButton";
import {useNavigation} from "@react-navigation/core";
import {NavigationScreenProp} from "react-navigation";
import {PUBLIC_ROUTES} from "@/Routes";

const AccountSplashView = (): ReactElement => {
    const navigation: NavigationScreenProp<any> = useNavigation();

    return (
        <Fragment>
            <ScrollView>
                <View style={AccountSplashStyleSheet.bagImageContainer}>
                    <Image
                        source={BagImage}
                        style={AccountSplashStyleSheet.bagImage}
                    />
                </View>

                <View style={AccountSplashStyleSheet.welcomeTextContainer}>
                    <Text style={AccountSplashStyleSheet.welcomeText}>
                        Welcome
                    </Text>
                    <Text style={AccountSplashStyleSheet.welcomeSubtitle}>
                        Before enjoying food media services
                    </Text>
                    <Text style={AccountSplashStyleSheet.welcomeSubtitle}>
                        please register first!
                    </Text>
                </View>

                <View style={AccountSplashStyleSheet.submitButtonContainer}>
                    <PrimaryButton
                        style={{marginBottom: 15}}
                        label={"Create Account"}
                        onPress={() => navigation.navigate(PUBLIC_ROUTES.REGISTER)}
                    />
                    <PrimaryButton
                        label={"Login"}
                        onPress={() => navigation.navigate(PUBLIC_ROUTES.LOGIN)}
                    />
                </View>

                <View style={AccountSplashStyleSheet.termsAndConditionsContainer}>
                    <Text style={AccountSplashStyleSheet.termsAndConditionsText}>
                        By Logging Or Registering You agree the
                        <Text style={AccountSplashStyleSheet.termsAndConditionsTextLink}>
                            {"Terms & Conditions"}
                        </Text>
                        &
                        <Text style={AccountSplashStyleSheet.termsAndConditionsTextLink}>
                            {"Our Privacy Policy"}
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export default AccountSplashView;
