import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const OrderPlaceSuccessfulStyleSheet = StyleSheet.create({

    root: {

    },
    orderSuccessfulContainer: {

    },
    OrderSuccessfulImage: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
    },
    Image: {
        width: 250,
        height: 250,
    },
    orderSuccessfulTitle: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 21,
        color: ColorsConfig.titleTextColor,
    },
    textInfo: {
        fontSize: 14,
        textAlign: "center",
    },
    viewOrderButton: {
        marginTop: windowHeight -550,
        marginBottom: 30,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },
    continueShopping: {

    },
    continueShoppingText: {
        textAlign: "center",
        fontSize: 14,
        color: "#000000",
    },


});
