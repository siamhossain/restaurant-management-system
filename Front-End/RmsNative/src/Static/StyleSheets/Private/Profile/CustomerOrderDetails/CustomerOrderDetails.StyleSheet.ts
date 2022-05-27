import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

export const CustomerOrderDetailsStyleSheet = StyleSheet.create({

    root: {

    },

    orderDetailsInfoContainer: {
        backgroundColor: "#ffffff",

        ...Padding({
            all:40,
        }),


    },

    orderDetailsInfoTitle: {
        fontSize: 13,
        color: ColorsConfig.sectionHighlightedTextColor,

    },

    orderHeadingContainer: {
        ...Padding({
            top: 40,

        }),
    },

    orderHeading: {
        color: "#000000",
        fontSize: 20,
    },

    ordersInfoContainer: {
        borderBottomWidth: 1,
        borderColor : ColorsConfig.menuBorderColor,
        flexDirection: "row",
        justifyContent: "space-between",
        ...Padding({
            top: 10,
            bottom: 10,

        })
    },

    orderInfoHeading: {
        color: "#000000",
        fontSize: 12,

    },
    orderInfoData: {

    },

    billingAddressContainer: {

    },

    billingAddressHeading: {
        fontSize: 20,
        color:"#000",
        ...Padding({
            top: 40,
            bottom: 20,
        })

    },

    billingAddress: {
        color: "#000",
        fontSize: 14,
    ...Padding({
            top: 10,

        })

    },


});
