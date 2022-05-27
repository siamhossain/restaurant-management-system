import {StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

export const CategoryItemStyleSheet = StyleSheet.create({

    root: {
        marginTop: 50,
        alignItems: "center",
        ...Padding({
            left: 10,
            right: 10,
        }),
    },
    categoryImageContainer: {
        height: 85,
        width: 85,
        backgroundColor: ColorsConfig.containerBackgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },

    categoryItemImage: {
        height: 45,
        width: 45,

    },

    titleContainer: {},

    title: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "500",
        marginTop: 15,
        textAlign: "center"
    }

});
