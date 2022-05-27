import React, {Fragment, ReactElement} from 'react';
import {ScrollView, View, Text} from "react-native";
import {Row, Table} from "react-native-table-component";
import {DataGridStyleSheet} from "@/Static/StyleSheets/Global/DataGrid";

interface ITableProps {
    children?: React.ReactNode,
    heads: (string | React.ReactNode)[],
    headWidthArray?: number[] | undefined,
}

interface IRowProps {
    data: any[] | undefined,
    widthArray?: number[] | undefined,
}

interface IDangerText {
    children?: React.ReactNode,
}

const DataGrid = {
    Table: (props: ITableProps) => {
        const styles = DataGridStyleSheet;
        const tableWidthArray = props.headWidthArray ? props.headWidthArray : new Array(props.heads.length).fill(100);

        return (
            <Fragment>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {"Orders"}
                        </Text>
                    </View>
                    <ScrollView horizontal={true} style={styles.body}>
                        <View>
                            <Table>
                                <Row
                                    data={props.heads}
                                    widthArr={tableWidthArray}
                                    style={styles.header}
                                    textStyle={styles.headerText}
                                />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={styles.table}>
                                    {props.children}
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </Fragment>
        );
    },

    Row: (props: IRowProps) => {
        const styles = DataGridStyleSheet;
        const tableWidthArray = props.widthArray ? props.widthArray : new Array(props.data?.length).fill(100);

        return (
            <Row
                data={props.data}
                widthArr={tableWidthArray}
                style={styles.row}
                textStyle={styles.rowText}
            />
        )
    },

    DangerText: (props: IDangerText) => {
        const styles = DataGridStyleSheet;

        return (
            <Text style={styles.dangerText}>{props.children}</Text>
        );
    },

    SuccessText: (props: IDangerText) => {
        const styles = DataGridStyleSheet;

        return (
            <Text style={styles.successText}>{props.children}</Text>
        );
    },

    WarningText: (props: IDangerText) => {
        const styles = DataGridStyleSheet;

        return (
            <Text style={styles.warningText}>{props.children}</Text>
        );
    },

    InfoText: (props: IDangerText) => {
        const styles = DataGridStyleSheet;

        return (
            <Text style={styles.infoText}>{props.children}</Text>
        );
    },
};

export {DataGrid};
