import React, { Fragment, ReactElement } from 'react';
import {Image, Text, View} from "react-native";
import Logo from '@/Static/Images/Global/rcw-logo.png';
import {ColorsConfig} from "@/App/Config/Theme/Colors";

const SplashView = (): ReactElement => {
    return (
        <Fragment>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: ColorsConfig.primary,
            }}>
                <Image source={Logo} style={{width: 150, height: 150}} />

                <Text style={{fontSize: 25, color: "#ffffff", marginTop: 20}}>React Clock Work</Text>
            </View>
        </Fragment>
    );
};

export default SplashView;
