import {Dialog, Table} from 'evergreen-ui';
import React, { Fragment, ReactElement } from 'react';
import {ICustomerViewState} from "@/Views/Private/Admin/Customer/Customer.View";
import { cdn } from '@/App/Functions/Custom/cdn.Function';
import {echo} from "@/App/Functions/Custom/echo.Function";
interface ICustomerViewScreenProps {
    viewData: ICustomerViewState['view'],

    onViewClose(): void,
}


const CustomerViewScreen: React.FC<ICustomerViewScreenProps> = (props): ReactElement => {
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
                    <Table.TextHeaderCell>Name:</Table.TextHeaderCell>
                    <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
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

export { CustomerViewScreen };
