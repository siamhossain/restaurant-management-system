import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {ISupplierViewState} from "@/Views/Private/Admin/Supplier/Supplier.View";

interface ISupplierViewScreenProps {
    viewData: ISupplierViewState['view'],

    onViewClose(): void,
}
const SupplierViewScreen: React.FC<ISupplierViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Supplier View"
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
                        <Table.TextHeaderCell>Name:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.full_name)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Email:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.email)}</Table.TextCell>
                        <Table.TextHeaderCell>Phone:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.phone_number)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Aria Code:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.area_code)}</Table.TextCell>
                        <Table.TextHeaderCell>Present Address:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.address)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Profile Photo:</Table.TextHeaderCell>
                        <Table.TextCell>
                            {echo(props.viewData.data?.profile_image_uri) !== "" && (
                                <div style={{marginTop: 10, marginBottom: 10}}>
                                    <img src={cdn(echo(props.viewData.data?.profile_image_uri))}
                                         style={{borderRadius: 5, width: 85}} alt={""}/>
                                </div>
                            )}
                        </Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { SupplierViewScreen };
