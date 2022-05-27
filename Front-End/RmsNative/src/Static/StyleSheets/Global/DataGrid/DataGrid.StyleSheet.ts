import {StyleSheet} from "react-native";
import {ColorsConfig} from "@/App/Config/Theme/Colors";
import {Padding} from "@/App/Functions/Custom";


export const DataGridStyleSheet = StyleSheet.create({
    /**
     * Write your styles here
     */
    root: {

    },

    titleContainer: {
       /* backgroundColor: 'red',*/

    },

    title: {
        color: ColorsConfig.sectionHighlightedTextColor ,
        fontSize: 16,
        borderBottomWidth: 1,
        fontWeight: 'bold',
        borderColor: ColorsConfig.menuBorderColor,
        ...Padding({
            bottom: 10,
        })
    },

    table: {

    },

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: '100%',
        alignSelf: 'stretch',
    },

    body: {
    },

    header: {
        height: 40,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },

    headerText: {
        textAlign: 'center',
        fontWeight: '100',
        color: '#000000',
        fontSize: 12,
    },

    rowText: {
        textAlign: 'center',
        color: '#4c4c4c',
        fontSize: 12,
    },

    dangerText: {
        textAlign: 'center',
        color: '#f30d0d',
        fontSize: 12,
    },

    successText: {
        textAlign: 'center',
        color: '#038217',
        fontSize: 12,
    },

    warningText: {
        textAlign: 'center',
        color: '#FFAB3D',
        fontSize: 12,
    },

    infoText: {
        textAlign: 'center',
        color: '#3dc2ff',
        fontSize: 12,
    },

    dataWrapper: {

    },


    row: {
        height: 40,
        borderTopWidth: 1,
        borderColor: ColorsConfig.menuBorderColor,
    }
});
