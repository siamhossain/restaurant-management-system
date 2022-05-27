import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ProductDetailsStyleSheet = StyleSheet.create({

    root: {

    },
    productDetailsContainer: {
        backgroundColor: "#ffffff",
    },
    productDetailsBigImageBg: {
        backgroundColor: "#F2F2F2",
        height: 280,
        width: 330,
        marginTop: 50,
        marginBottom: 30,
        marginLeft: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
    },
    productDetailsBigImage: {
        height: 170,
        width: 250,
    },
    productDetailsSmall: {
        flexDirection: "row",
    },
    productDetailsSmallImageBg: {
        backgroundColor:"#FFD203",
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginLeft: 50,
        marginBottom: 30,
    },
    productDetailsSmallImage: {
        width: 60,
        height: 40,
    },
    productDetailsSmallImageBgChange: {
        backgroundColor: "#F2F2F2",
        height: 70,
        width: 70,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        borderRadius: 15,
    },
    productTitleContainer: {

    },
    productTitleText: {
        marginLeft: 30,
        fontSize: 25,
        fontWeight: "normal",
        color: "#000000"
    },
    productTitleTextDetail: {
        marginLeft: 30,
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "normal",
    },
    productPrice: {
        marginTop: 20,
        marginLeft: 30,
    },
    productPriceText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 30,
    },
    productInfo: {
        marginLeft: 30,
        marginBottom: 30,
    },
    productInfoText: {
        fontSize: 12,
        fontWeight: "normal",
        lineHeight: 20,

    },
    productCounter: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    productDecrease: {
        backgroundColor: "#F2F2F2",
        height: 50,
        width: 50,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productNumber: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 30,
        color: "#000000",
    },
    productIncrease: {
        backgroundColor: "#F2F2F2",
        height: 50,
        width: 50,
        marginTop: 10,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productButtonCart: {
        marginTop: windowHeight -550,
        marginBottom: 30,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },

});
