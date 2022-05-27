import {Dimensions, StyleSheet} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CustomerBillingAddressStyleSheet = StyleSheet.create({

    root: {


    },

    billingAddressContainer: {
        backgroundColor: "#ffffff",
    },

    titleInfoContainer: {
        marginTop: 40,
        marginBottom: 20,
    },

    titleInfo: {
        color: ColorsConfig.sectionHighlightedTextColor,
        fontSize: 16,
        fontWeight: "bold",
        ...Padding({
            top:25,
             left:25,

        })

    },

    inputBoxWrapper: {
        ...Padding({
            all: 25
        }),
        color: "#000",
    },

    saveAddressButtonContainer: {
        marginTop: windowHeight - 570,
        marginBottom:20,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },

});
