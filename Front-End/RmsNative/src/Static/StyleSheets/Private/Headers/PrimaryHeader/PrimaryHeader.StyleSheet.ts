import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const PrimaryHeaderStyleSheet = StyleSheet.create({

    root: {
        backgroundColor: "#F7F7F7",
        ...Padding({
            top: 30,
            bottom: 30,
        }),
    },

    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: "#000000",
    },

    closeButtonContainer: {
        position: 'absolute',
        right: 17,
        top: 33,
    }
});
