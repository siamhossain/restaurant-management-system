import React, { Fragment, ReactElement } from 'react';
import {ITableBookingViewState} from "@/Views/Private/Admin/TableBooking/TableBooking.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom";

interface ITableBookingViewScreenProps {
    viewData: ITableBookingViewState['view'],
    onViewClose(): void,
}
const TableBookingViewScreen: React.FC<ITableBookingViewScreenProps> = (props): ReactElement => {
    const particulars = props.viewData?.data?.booking_food_list;
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Table Booking View"
                hasCancel={false}
                confirmLabel={"Close"}
                shouldCloseOnOverlayClick={true}
                onCloseComplete={() => props.onViewClose()}
                width={'50%'}
            >
                <Table style={{width: '100%', textAlign: 'left'}}>
                    <Table.Row>
                        <Table.TextHeaderCell>Customer:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Date:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.date)}</Table.TextCell>
                        <Table.TextHeaderCell>Time:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.time)}</Table.TextCell>


                    </Table.Row>

                    <table style={{width: "100%"}}>
                        <thead style={{backgroundColor: '#c9c9c9', fontSize: '14px'}}>
                        <th>Category Name</th>
                        <th>Food Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        </thead>
                        <tbody>


                        {particulars?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category_name}</td>
                                <td>{item.food_name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total_price}</td>
                            </tr>
                        ))}


                        </tbody>
                    </table>

                </Table>
            </Dialog>
        </Fragment>
    );
};

export { TableBookingViewScreen };
