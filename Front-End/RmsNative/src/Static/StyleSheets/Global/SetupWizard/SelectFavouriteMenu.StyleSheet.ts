import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const SelectFavouriteMenuStyleSheet = StyleSheet.create({

    root: {

    },

    setup2Container: {
        ...Padding({
            left:20,
            right: 20,
        })

    },

    setup2imageContainer: {
        alignItems: "center",
        marginBottom: 20,
        ...Padding({
            top: 50,
            bottom: 15,
        })

    },

    selectFavouriteMenuImage: {
        width: 250,
        height: 250,

    },

    nearRestaurantInfo: {
        alignItems: 'center',
        marginTop: 30,
    },

    nearRestaurantTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F2937"
    },

    restaurantInfoText: {
        fontSize: 12,
        textAlign: "center",
        ...Padding({
            top: 20,
            left: 25,
            right: 25,
        })

    },
});
