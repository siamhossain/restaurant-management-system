import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ProductCartStyleSheet = StyleSheet.create({

    root: {

    },
    allProduct: {
        flexDirection: "row",
        alignItems: "center",
    },
    burgerImage: {
       height: 110,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 90,
        height: 80,
    },
    productItemDetails: {
        height: 110,
        width: 140,
        marginLeft: 10,
    },
    proName: {
        fontSize: 17,
        color: "#000000",
    },
    productCounter: {
        justifyContent: "center",
        alignItems: "center",
    },
    counter: {
        height: 40,
        width: 80,
        borderWidth: 1,
        borderColor: "#F2F2F2",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    productItemPrice: {

    },
    singleProductItemPrice: {
       height: 110,
        width: 80,
        marginLeft: 10,

    },
    icon: {
         marginLeft: 40,

    },
    itemPrice: {
        justifyContent: "center",
        alignItems: "center",
    },
    price: {
        fontSize: 17,
        marginTop: 30,
        color: "#000000",

    },
    productItemContainer: {
        ...Padding({
            all:25,
        })
    },
    productItem: {
        width: 335,
        height: 140,
        backgroundColor:"#ffffff",
        marginBottom: 20,
        flexDirection: "row",

    },
    doubleDeckerImage: {
        width: 100,
        height: 80,
        marginTop: 10,
    },
    productDetailsContainer: {


    },
    productDetails: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 15,
    },
    productName: {
        marginRight: 40,
        fontSize: 17,
        color: "#000000",
    },
    productNumberMinus: {

    },
    productNumber: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20
    },


    applyCouponButton: {


    },
    productInfoContainer: {
        marginTop: 30,

    },
    productInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    productItemName: {
        ...Padding({
            bottom: 20,
        })

    },
    productPrice: {
        color: "#000000"

    },
    proceedPaymentMethodButton: {
        marginTop: windowHeight -550,
        marginBottom: 30,
    },

});
