import {StyleSheet} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

export const ProductCardStyleSheet = StyleSheet.create({

    root: {
        flex: 1,
        flexDirection: "column",
        ...Padding({
            all: 10,
        }),
        flexBasis: '50%',
    },

    productContainer: {
        height: 200,
        backgroundColor: ColorsConfig.containerBackgroundColor,
        borderRadius: 20,

        ...Padding({
            all: 18,
        }),

    },

    productImageContainer: {
        alignItems: "center",
    },

    productImage: {
        width: 90,
        height: 90,
    },

    titleContainer: {
        flexDirection: "row",
        marginTop: 45,
    },

    productTitle: {
        color: "#000000",
        fontSize: 12,
        fontWeight: "bold",
    },

    price: {
        color: ColorsConfig.sectionHighlightedTextColor,
        fontSize: 12,
        fontWeight: "bold",
    }

});
