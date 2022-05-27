import React, {Fragment, ReactElement} from 'react';
import {View, ScrollView, Text} from "react-native";
import {CustomerOrderListStyleSheet} from "@/Static/StyleSheets/Private/Profile/OrderList";
import {DataGrid} from "@/Components/Core/DataGrid";
import {PrimaryHeaderScreen} from "@/Components/Screens/Private/Headers/PrimaryHeader";

const CustomerOrderListScreen = (): ReactElement => {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
        const rowData = [];
        for (let j = 0; j < 9; j += 1) {
            rowData.push(`${i}${j}`);
        }
        tableData.push(rowData);
    }

    return (
        <Fragment>
            <PrimaryHeaderScreen title={"My Orders"}/>
            <ScrollView>
                <View style={CustomerOrderListStyleSheet.orderListContainer}>
                    <View style={CustomerOrderListStyleSheet.tableContainer}>
                        <DataGrid.Table heads={['Order', 'Date', 'status', 'Total', 'action']}>
                            <DataGrid.Row data={[
                                '#125',
                                '12/20/2021',
                                <DataGrid.WarningText>Inactive</DataGrid.WarningText>,
                                '550 tk',
                                <DataGrid.InfoText>View</DataGrid.InfoText>,
                            ]}/>
                            <DataGrid.Row data={[
                                '#160',
                                '12/20/2021',
                                <DataGrid.SuccessText>Delivered</DataGrid.SuccessText>,
                                '690 tk',
                                <DataGrid.InfoText>View</DataGrid.InfoText>,
                            ]}/>
                            <DataGrid.Row data={[
                                '#190',
                                '12/20/2021',
                                <DataGrid.DangerText>Cancel</DataGrid.DangerText>,
                                '990 tk',
                                <DataGrid.InfoText>View</DataGrid.InfoText>,
                            ]}/>
                        </DataGrid.Table>

                        <View style={CustomerOrderListStyleSheet.noOrderFound}>
                            <Text style={CustomerOrderListStyleSheet.orderInfo}>
                                {"No order has been made yet"}
                            </Text>

                        </View>


                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
};

export {CustomerOrderListScreen};
