import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PaymentMethodStyleSheet = StyleSheet.create({

    root: {

    },
    paymentContainer: {

    },
    selectDeliveryTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        ...Padding({
            all: 25,
        })
    },
    selectDeliveryTitleText: {
        fontSize: 18,
        color: ColorsConfig.titleTextColor,
    },
    selectDeliveryTitleButton: {
        fontSize: 18,
        color: "#FA4A0C"
    },
    addressContainer: {
        ...Padding({
            all: 25,
        })
    },
    selectAddress: {
        width: 335,
        height: 100,
        backgroundColor:"#000000",
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: 20,
    },
    selectRadioButton: {
        height: 15,
        width: 15,
        borderRadius: 100,
        backgroundColor: "#FA4A0C",
        margin: 10,
    },
    addressDetails: {

    },
    addressDetailsTextTitle: {
        color: "#ffffff",
        ...Padding({
            all: 5
        }),
        fontSize: 16,

    },
    addressDetailsText: {
        color: "#ffffff",
        marginLeft: 5,
    },
    Address: {
        width: 335,
        height: 100,
        backgroundColor:"#ffffff",
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: 20,
    },
    RadioButton: {
        height: 15,
        width: 15,
        borderRadius: 100,
        margin: 10,

    },
    otherAddressDetails: {

    },
    otherAddressDetailsTextTitle: {
        color: "#000000",
        ...Padding({
            all: 5
        }),
        fontSize: 16,
    },
    otherAddressDetailsText: {
        color: "#000000",
        marginLeft: 5,

    },
    paymentMethodContainer: {
        ...Padding({
            all: 25,
        })
    },
    paymentMethodTitle: {
        marginBottom: 20,

    },
    paymentMethodTitleText: {
        fontSize: 18,
        color: "#000000",
        fontWeight: "500",
    },
    allPaymentMethodLogo: {
        flexDirection: "row",


    },
    paymentLogo: {
        width: 100,
        height: 90,
        backgroundColor:"#ffffff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    rocketImage: {
        width: 60,
        height: 40,
    },
    logoName: {
        fontSize: 14,
        color: "#000000",

    },
    bkashImage: {
        width: 40,
        height: 40,
    },
    nagadImage: {
        width: 60,
        height: 40,
    },
    inputBoxWrapper: {
        ...Padding({
            all: 25
        }),
        color: "#000",
    },

    paymentButton: {
        marginTop: windowHeight - 570,
        marginBottom:20,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },
});



