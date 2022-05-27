import React, {Fragment, ReactElement} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import {PrimaryHeaderStyleSheet} from "@/Static/StyleSheets/Private/Headers/PrimaryHeader";

interface IPrimaryHeaderScreenProps {
    title?: string,
    onClosePress?(): void,
}

const PrimaryHeaderScreen: React.FC<IPrimaryHeaderScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <View style={PrimaryHeaderStyleSheet.root}>
                <View style={PrimaryHeaderStyleSheet.titleContainer}>
                    <Text style={PrimaryHeaderStyleSheet.titleText}>
                        {props.title}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={props.onClosePress}
                    style={PrimaryHeaderStyleSheet.closeButtonContainer}>
                    <AntIcon name={"close"} size={20} color={"#000000"}/>
                </TouchableOpacity>
            </View>
        </Fragment>
    );
};

export {PrimaryHeaderScreen};
