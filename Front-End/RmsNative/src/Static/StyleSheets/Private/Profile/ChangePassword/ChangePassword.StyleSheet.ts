import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChangePasswordStyleSheet = StyleSheet.create({

    root: {
        backgroundColor: "#ffffff",

    },

    passwordChangeContainer: {
        alignItems: "center",
        position: "relative",
    },

    changePasswordTitle: {
        marginTop: 40,
        fontSize: 18,
        color: "#000",
    },

    closeIcon: {
        color: "#000",
        position: "absolute",
        right: 40,
        top: 40,
    },

    inputBoxWrapper: {
        ...Padding({
            left: 15,
            right: 15,
            top: 50,
            bottom: 10,
        }),
        color: "#000",
    },

    submitButtonContainer: {
        marginTop: windowHeight - 500,
        marginBottom:10,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },

});
