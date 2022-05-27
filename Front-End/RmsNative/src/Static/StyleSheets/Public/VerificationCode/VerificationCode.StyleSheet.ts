import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const VerificationCodeStyleSheet = StyleSheet.create({

    root: {
        flex: 1,
        ...Padding({
            left: 30,
            right: 50,
            top: 100,
            bottom: 20,
        }),
        zIndex: 0,
        backgroundColor: "#ffffff",
    },

    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    titleText: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#374151",
    },

    subtitleText: {
        fontSize: 17,
    },

    numberText: {
        marginTop: 5,
    },


    codeContainer: {
        ...Padding({
            left: 70,
            right: 70,
            bottom:20,
        }),

    },

    additionalInfoContainer: {
        flexDirection:'row',
        flexWrap: "wrap",
        justifyContent: 'center',
    },

    additionalInfoLink: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 30,
    },

    submitButtonContainer: {

        marginBottom:50,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },
});
