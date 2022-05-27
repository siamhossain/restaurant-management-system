import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChangeNewPasswordStyleSheet = StyleSheet.create({

    root: {
        flex: 1,
        ...Padding({
            left: 30,
            right: 50,
            top: 50,
            bottom: 20,
        }),
        zIndex: 0,
        backgroundColor: "#ffffff",
    },

    titleContainer: {
        marginBottom: 80,
    },

    titleText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#000000",
    },

    subtitleText: {
        fontSize: 16,

    },

    submitButtonContainer: {
        marginTop: windowHeight - 480,
        marginBottom:10,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },
});
