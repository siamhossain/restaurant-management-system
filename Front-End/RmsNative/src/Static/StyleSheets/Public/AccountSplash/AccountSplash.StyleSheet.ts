import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";


export const AccountSplashStyleSheet = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    bagImageContainer: {
        alignItems: 'center',
        ...Padding({
            top: 80,
            bottom: 15,
        })
    },

    bagImage: {
        width: 170,
        height: 170,
    },

    welcomeTextContainer: {
        alignItems: 'center',
        ...Padding({
            left: 50,
            right: 50,
        })
    },

    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000000",
        marginBottom: 10,
        textAlign: "center",
    },

    welcomeSubtitle: {
        color: "#565656",
        fontSize: 13,
        textTransform: "capitalize",
        lineHeight: 20,
        textAlign: "center",
    },

    submitButtonContainer: {
        marginTop: 50,
        ...Padding({
            left: 80,
            right: 80,
        })
    },


    termsAndConditionsContainer: {
        alignItems: "center",
        marginTop: 30,
        ...Padding({
            left: 50,
            right: 50,
        })
    },

    termsAndConditionsText: {
        color: "#696969",
        fontSize: 11,
        textAlign: "center",
        lineHeight: 15,
    },

    termsAndConditionsTextLink: {
        color: "#28be3c",
    }
});
