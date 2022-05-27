import { StyleSheet } from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";

export const CustomerProfileScreenStyleSheet = StyleSheet.create({

    root: {
/*backgroundColor:"#ffffff",*/
    },

    profileTitleContainer: {
        backgroundColor: ColorsConfig.secondary,
        alignItems: "center",
        height: 143,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 20,
        ...Padding({
            top: 30,
        })
    },

    profileContainer : {
        marginTop: -60,
        backgroundColor: "#FFFFFF",
        // elevation: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "red",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        margin: 23,
        ...Padding({
            all: 15,
        }),
    },

    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
    },

    avatarImage: {
        width: 98,
        height: 98,
        borderRadius: 50,
    },

    profileName: {
        color: "#000",
        marginLeft: 25,
        fontSize: 14,
    },

    profileEmail: {
        marginLeft: 25,
        color: ColorsConfig.textColor,
        fontSize: 14,
    },

    edit: {
        textAlign: "right",
        fontSize: 16,
        color: ColorsConfig.textColor,
    },

    profileMenuContainer: {
        padding: 25,
        // elevation: 10,
        shadowOffset: { width: 5, height: 5},
        shadowColor: "red",
        shadowOpacity: 0.1,
        shadowRadius: 0,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        marginLeft: 23,
        marginRight: 23,
    },

    menuItem: {
        borderBottomWidth: 1,
        borderColor: ColorsConfig.menuBorderColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...Padding({
            top: 10,
            bottom: 10,
        })
    },

    profileDetails: {
        color: "#000000",
        fontSize: 14,
    },

});
