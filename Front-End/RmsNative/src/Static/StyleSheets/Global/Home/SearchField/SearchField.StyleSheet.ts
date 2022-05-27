import { StyleSheet } from "react-native";
import {Padding} from "@/App/Functions/Custom";

export const SearchFieldStyleSheet = StyleSheet.create({
    root: {

    },
    searchContainer: {
        borderWidth: 1,
        borderColor: "#f5f5f5",
        borderRadius: 10,
        elevation: 2,
       /* backgroundColor: "#ffffff",*/
        ...Padding({
            all: 2,
        }),
    },
});
