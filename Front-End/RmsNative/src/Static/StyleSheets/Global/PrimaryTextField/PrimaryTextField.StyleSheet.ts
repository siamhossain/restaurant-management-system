import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const PrimaryTextFieldStyleSheet = StyleSheet.create({
    root: {
        marginBottom: 15,
    },

    label: {
        fontWeight: "bold",
        marginLeft: 13,
        marginBottom: 5,
        fontSize: 15,
    },

    textInput: {
        borderWidth: 1,
        borderColor: "#bec5d1",
        borderRadius: 12,
        ...Padding({
            left: 14,
            right: 14,
        }),
        height: 48,
        fontSize: 15,
    }
});
