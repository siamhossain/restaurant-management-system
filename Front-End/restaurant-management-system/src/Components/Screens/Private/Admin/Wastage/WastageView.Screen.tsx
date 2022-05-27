import React, { Fragment, ReactElement } from 'react';
import {IWastageViewState} from "@/Views/Private/Admin/Wastage/Wastage.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom";

interface IWastageViewScreenProps {
    viewData: IWastageViewState['view'],

    onViewClose(): void,
}
const WastageViewScreen: React.FC<IWastageViewScreenProps> = (props): ReactElement => {
    const particulars = props.viewData.data.particulars;
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Wastage View"
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
                    <table style={{width: "100%"}}>
                        <thead style={{backgroundColor: '#c9c9c9', fontSize: '14px'}}>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        </thead>
                        <tbody>


                        {particulars?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product_title}</td>
                                <td>{item.qty}</td>
                                <td>{item.unit_price}</td>
                                <td>{item.total_amount}</td>
                            </tr>
                        ))}


                        </tbody>
                    </table>

                </Table>
            </Dialog>
        </Fragment>
    );
};

export { WastageViewScreen };
