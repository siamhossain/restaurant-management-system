import React, {Fragment, ReactElement} from 'react';
import {TouchableOpacity, View} from "react-native";
import {NavigationStyleSheet} from "@/Static/StyleSheets/Global/SetupWizard";
import AntIcon from "react-native-vector-icons/AntDesign";

export interface INavigationProps {
    onPressNext?(): void,

    totalSteps?: number,
    activeStep?: number,
}

export interface INavigationState {

}


const NavigationScreen: React.FC<INavigationProps> = (props): ReactElement => {

    return (
        <Fragment>
            <View style={NavigationStyleSheet.navigationContainer}>
                <View style={NavigationStyleSheet.navigationLeft}>
                    {props.totalSteps && (
                        <View style={NavigationStyleSheet.stepsContainer}>
                            {new Array(props.totalSteps).fill(0).map((number, index) => (
                                <View
                                    key={index}
                                    style={{
                                        ...NavigationStyleSheet.stepDot,
                                        backgroundColor: (props.activeStep === index + 1) ? "#FFA718" : "#E6E6E6",
                                    }}
                                />
                            ))}
                        </View>
                    )}
                </View>
                <View style={NavigationStyleSheet.navigationRight}>
                    <TouchableOpacity
                        onPress={props.onPressNext}
                        style={NavigationStyleSheet.navigationLeftText}>
                        <AntIcon name={"arrowright"} size={20} color={"#000000"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Fragment>
    );
};

export {NavigationScreen};
