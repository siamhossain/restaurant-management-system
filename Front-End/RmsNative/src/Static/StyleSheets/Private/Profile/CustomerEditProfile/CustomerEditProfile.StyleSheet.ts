import {Dimensions, StyleSheet} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CustomerEditProfileStyleSheet = StyleSheet.create({

    root: {
        backgroundColor: "#ffffff",
    },


    inputBox: {
        borderWidth: 1,
        borderColor: ColorsConfig.inputBoxBorderColor,
        marginTop: 50,
        marginBottom:50,
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

    gender: {
        flexDirection: "row",
        marginLeft: -7,
    },

    selectGenderRadioButton: {
        ...Padding({
            all: 20
        })


    },

    selectGenderRadioButtonTitle: {
        fontWeight: "bold",

    },

    genderRadioButton: {

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
