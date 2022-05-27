import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const NewPasswordSuccessStyleSheet = StyleSheet.create({

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

    logoContainer: {
        alignItems: 'center',
        ...Padding({
            top: 30,
            bottom: 0,
        })
    },

    logoImage: {
        width: 100,
        height: 140,
    },

    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    titleText: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#374151",
    },

    subtitleText: {
        fontSize: 15,
    },

    submitButtonContainer: {
        marginTop: windowHeight - 450,
        marginBottom:10,
        ...Padding({
            left: 30,
            right: 30,
        }),
    },
});
