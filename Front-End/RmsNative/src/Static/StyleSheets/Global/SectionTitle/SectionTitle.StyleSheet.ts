import { StyleSheet } from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";

export const SectionTitleStyleSheet = StyleSheet.create({

    root: {
        marginTop: 50,
        marginBottom: 20,
    },
    titleCommon: {
        fontSize: 21,
        color: "#000000",
        fontWeight: "500",
    },
    title: {
        color: ColorsConfig.sectionHighlightedTextColor,
        fontSize: 21,
        marginLeft: 10,
        fontWeight: "500",
    }
});
