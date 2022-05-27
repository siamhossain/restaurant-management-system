import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {ICustomerPaymentViewState} from "@/Views/Private/Admin/CustomerPayment/CustomerPayment.View";

interface ICustomerPaymentViewScreenProps {
    viewData: ICustomerPaymentViewState['view'],

    onViewClose(): void,
}

const CustomerPaymentViewScreen: React.FC<ICustomerPaymentViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Customer Payment View"
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
                        <Table.TextHeaderCell>Customer Name:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.customer?.name)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Date:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.date)}</Table.TextCell>
                        <Table.TextHeaderCell>Amount:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.paid_amount)}</Table.TextCell>
                    </Table.Row>

                </Table>
            </Dialog>
        </Fragment>
    );
};

export { CustomerPaymentViewScreen };
