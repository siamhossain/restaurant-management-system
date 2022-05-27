import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const SideDrawerStyleSheet = StyleSheet.create({

    root: {

    },

    logoContainer: {
        backgroundColor: "#FFD700",
        height: 120,

    },

    logoImage: {
        height: 60,
        width: 100,
        marginLeft: 30,
        marginTop: 30,
    },

    sideDrawerContainer: {
        ...Padding({
            all: 15
        })

    },

    sideDrawerMenuItem: {
        flex: 1
    },

    listItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    listItemIconContainer: {
        width: 15,
        height: 15,
        ...Padding({
            left: 19,
            right: 19,
        }),
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
    },

    listItemIcon: {
        width: 18,
        height: 17,
    }

    /*style={{ flex: 1 }},*/
});
