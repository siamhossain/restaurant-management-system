import {Dimensions, StyleSheet} from "react-native";
import {Padding} from "@/App/Functions/Custom";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CustomerOrderListStyleSheet = StyleSheet.create({

    root: {


    },

    orderListContainer: {
        alignItems: "center",
        position: "relative",
        backgroundColor:"#ffffff"
    },

    tableContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
    },

    noOrderFound: {
        marginTop: windowHeight - 500,
        marginBottom:50,
        backgroundColor: "#F7F7F7",
        height: 100,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        margin: 25,
        ...Padding({
            all: 15,
        }),
    },

    orderInfo: {
        color: ColorsConfig.sectionHighlightedTextColor ,
        fontSize: 14,
        fontWeight: "500",
    },

});
