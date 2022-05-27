import {Dimensions, StyleSheet} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CustomerAboutStyleSheet = StyleSheet.create({

    root: {
        backgroundColor: "#ffffff",
    },

    aboutInfo: {
        marginTop:50,
        borderTopWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        borderColor : ColorsConfig.menuBorderColor,

    },

    aboutInfoContainer: {
        borderBottomWidth: 1,
        borderColor : ColorsConfig.menuBorderColor,
        ...Padding({
            left: 25,
            right: 25,
            top: 15,
            bottom: 15,
        })
    },

    name: {
        color: "#000",
        fontSize: 14,
    },

    fullName: {
        color: ColorsConfig.textColor,
        fontWeight: "500",


    },

    contactNumber: {
        color: "#000",
    },

    phoneNumber: {

    },

    gender: {
        color: "#000",

    },

    genderInfo: {

    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    submitButtonContainer: {
        marginTop: windowHeight - 450,
        marginBottom:10,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },


});
