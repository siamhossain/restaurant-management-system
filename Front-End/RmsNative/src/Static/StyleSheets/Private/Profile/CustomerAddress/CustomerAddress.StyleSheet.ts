import { StyleSheet } from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

export const CustomerAddressStyleSheet = StyleSheet.create({

    root: {

    },
    addressContainer: {
        backgroundColor: "#ffffff",

    },

    titleContainer: {
        marginTop: 40,
    },

    title: {
        color: ColorsConfig.sectionHighlightedTextColor,
        fontSize: 16,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#e7e6e6",
        marginLeft: 30,
        marginRight: 30,
        paddingBottom: 10,
    },

    InfoAddressContainer: {


    },

    infoAddress: {
        fontSize: 13,
        color: "#000000",
        fontWeight: "normal",
        ...Padding({
            left: 30,
            right:30,
            top: 20,
        })

    },

    billingAddressContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        borderBottomColor: ColorsConfig.textColor
    },

    billingAddress: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
    },

    billingAddressName: {
        marginTop: 10,
        paddingBottom: 20,
    },

    editBillingAddressDescription: {
        flex: 1,
        ...Padding({
            right: 5,
        })
    },

    editBillingAddressButton: {
        justifyContent: "center",
    },

    shippingAddressContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 30,
        marginRight: 30,
    },

    shippingAddress: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
    },

    editShippingAddressButton: {

    },

});
