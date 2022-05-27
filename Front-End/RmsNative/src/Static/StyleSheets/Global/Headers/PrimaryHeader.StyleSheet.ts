import {StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const PrimaryHeaderStyleSheet = StyleSheet.create({
    root: {
        ...Padding({
            all: 20,
        }),
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#ffffff",
    },

    menuContainer: {
        borderColor: "red",
        flexDirection: "row",
        alignItems: "center",
        ...Padding({
            all: 0,
        }),
    },

    menuIcon: {
        height: 25,
        width: 25,
    },

    middleContentContainer: {
        borderColor: "red",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    middleContentWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    titleText: {
        fontWeight: "700",
        color: "#000000",
        fontSize: 18,
    },

    titleImage: {
        marginLeft: 10,
        width: 22,
        height: 22,
    },



    profileAvatarContainer: {
        borderColor: "red",
        flexDirection: "row",
        alignItems: "center",
        ...Padding({
            all: 0,
        })
    },

    avatarPlaceholder: {
        height: 35,
        width: 35,
        borderRadius: 10,
    },


});
