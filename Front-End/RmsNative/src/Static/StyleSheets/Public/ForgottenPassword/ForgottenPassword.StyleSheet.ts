import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ForgottenPasswordStyleSheet = StyleSheet.create({

    root: {
        flex: 1,
        ...Padding({
            left: 30,
            right: 50,
            top: 50,
            bottom: 20,
        }),
        zIndex: 0,
        backgroundColor: "#ffffff",
    },

    titleContainer: {
        marginBottom: 30,
    },

    titleText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#000000",
    },

    subtitleText: {
        fontSize: 11,

    },

    additionalInfoContainer: {
        flexDirection:'row',
        flexWrap: "wrap",
    },

    additionalInfoText: {

    },

    additionalInfoLink: {
        color: ColorsConfig.secondary,
    },

    submitButtonContainer: {
        marginTop: windowHeight - 350,
        marginBottom:10,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },

});
