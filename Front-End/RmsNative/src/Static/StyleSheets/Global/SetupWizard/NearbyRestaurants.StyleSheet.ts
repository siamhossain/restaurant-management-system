import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const NearbyRestaurantsStyleSheet = StyleSheet.create({

    root: {

    },

    SetupContainer: {
        ...Padding({
            left:20,
            right: 20,
            bottom:20,
        })

    },

    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
        ...Padding({
            top: 80,
            bottom: 15,
        })

    },

    nearRestaurantImage: {
        width: 300,
        height: 200,

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

    restaurantInfo: {
        fontSize: 12,
        textAlign: "center",
        ...Padding({
            top: 20,
            left: 25,
            right: 25,
        })

    },
});
