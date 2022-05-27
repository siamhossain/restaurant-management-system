import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

export const PrimaryButtonStyleSheet = StyleSheet.create({

    root: {
        borderRadius: 10,
        ...Padding({
            all: 3,
        }),
        backgroundColor: ColorsConfig.primary,
        textTransform: "capitalize",
    },

    label: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
    }
});
