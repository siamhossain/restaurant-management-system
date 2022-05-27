import React, { Fragment, ReactElement } from 'react';
import {IDueInvoiceViewState} from "@/Views/Private/Admin/DueInvoice/DueInvoice.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom";

interface IDueInvoiceViewScreenProps {
    viewData: IDueInvoiceViewState['view'],

    onViewClose(): void,
}
const DueInvoiceViewScreen: React.FC<IDueInvoiceViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Due Invoice View"
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
                        <Table.TextHeaderCell>Type :</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.participant_type)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Name :</Table.TextHeaderCell>
                        {props.viewData.data.participant_type === 'Customer' ? (
                            <Table.TextCell>{echo(props.viewData.data?.customer?.name)}</Table.TextCell>
                        ) : (
                            <Table.TextCell>{echo(props.viewData.data?.supplier?.full_name)}</Table.TextCell>
                        )}
                        <Table.TextHeaderCell>Amount :</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.amount)}</Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { DueInvoiceViewScreen };
