import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {IPurchaseOrderViewState} from "@/Views/Private/Admin/PurchaseOrder/PurchaseOrder.View";

interface IPurchaseOrderViewScreenProps {
    viewData: IPurchaseOrderViewState['view'],
    onViewClose(): void,
}
const PurchaseOrderViewScreen: React.FC<IPurchaseOrderViewScreenProps> = (props): ReactElement => {
    const particulars = props.viewData.data?.particulars;
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Ingredient Purchase View"
                hasCancel={false}
                confirmLabel={"Close"}
                shouldCloseOnOverlayClick={true}
                onCloseComplete={() => props.onViewClose()}
                width={'50%'}
            >
                <Table style={{width: '100%', textAlign: 'left'}}>
                    <Table.Row>
                        <Table.TextHeaderCell>Code:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.code)}</Table.TextCell>
                        <Table.TextHeaderCell>Date:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.date)}</Table.TextCell>
                        <Table.TextHeaderCell>Total Amount:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.total_amount)}</Table.TextCell>

                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Discount:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.discount)}</Table.TextCell>
                        {props.viewData.data.payment_type === 'Credit' ? (
                            <>
                                <Table.TextHeaderCell>Paid Amount:</Table.TextHeaderCell>
                                <Table.TextCell>{echo(props.viewData.data?.paid_amount)}</Table.TextCell>
                                <Table.TextHeaderCell>Due Amount:</Table.TextHeaderCell>
                                <Table.TextCell>{echo(props.viewData.data?.due_amount)}</Table.TextCell>
                            </>
                        ) : (
                            <>
                                <Table.TextHeaderCell>Receive Amount:</Table.TextHeaderCell>
                                <Table.TextCell>{echo(props.viewData.data?.received_amount)}</Table.TextCell>
                                <Table.TextHeaderCell>Return Amount:</Table.TextHeaderCell>
                                <Table.TextCell>{echo(props.viewData.data?.return_amount)}</Table.TextCell>
                            </>
                        )}

                    </Table.Row>
                    <table style={{width: "100%"}}>
                        <thead style={{backgroundColor: '#c9c9c9', fontSize: '14px'}}>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        </thead>
                        <tbody>


                        {particulars?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product_code}</td>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit_price}</td>
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

export { PurchaseOrderViewScreen };
