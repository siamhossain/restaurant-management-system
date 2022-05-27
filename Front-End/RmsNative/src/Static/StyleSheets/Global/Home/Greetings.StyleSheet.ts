import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const GreetingsStyleSheet = StyleSheet.create({

    root: {

    },

    titleContainer: {

    },

    titleText: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
    },

    subTitleContainer: {

    },

    subtitleText: {
        fontSize: 16,
        color: '#9A9A9D',
        ...Padding({
            left: 10,
            top: 5,
            bottom: 20,
        }),
    },


});
