import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

export const LoginStyleSheet = StyleSheet.create({
    root:  {
        flex: 1,
        ...Padding({
            left: 50,
            right: 50,
            top: 20,
            bottom: 20,
        }),
        backgroundColor: "#ffffff",
    },

    logoContainer: {
        alignItems: 'center',
        ...Padding({
            top: 30,
            bottom: 40,
        })
    },

    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },

    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000000"
    },

    logoImage: {
        width: 170,
        height: 100
    },

    forgetPasswordContainer: {
        marginBottom: 40,
    },

    forgetPasswordText: {
        fontSize: 12,
        textAlign: "right",
        color: ColorsConfig.secondary,
    },


    submitButtonContainer: {
        marginTop: 20,
        marginBottom:10,
        ...Padding({
            left: 60,
            right: 60,
        }),
    },

    additionalInfoContainer: {
        alignItems: "center",
        marginBottom: 50,
    },

    additionalInfoText: {
        color: "gray",
        fontSize: 11,
    },

    additionalInfoLink: {
        color: "#28be3c",
        fontSize: 11,
    },
});
