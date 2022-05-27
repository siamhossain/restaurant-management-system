import { StyleSheet } from "react-native";

export const NavigationStyleSheet = StyleSheet.create({

    root: {

    },

    navigationContainer: {
        height: 100,
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },

    navigationLeft: {
        width: 150,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationLeftText: {


    },

    navigationRight: {
        width: 150,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
    },

    stepsContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    stepDot: {
        borderRadius: 100,
        height: 10,
        width: 11,
        marginLeft: 4,
        marginRight: 4,
    }

});
