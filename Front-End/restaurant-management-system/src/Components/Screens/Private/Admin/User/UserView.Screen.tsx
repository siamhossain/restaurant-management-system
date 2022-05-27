import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {IUserViewState} from "@/Views/Private/Admin/User/User.View";

interface IUserViewScreenProps {
    viewData: IUserViewState['view'],

    onViewClose(): void,
}

const UserViewScreen: React.FC<IUserViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="User View"
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
                        <Table.TextCell>{echo(props.viewData.data?.phone)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Username:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.username)}</Table.TextCell>
                        <Table.TextHeaderCell>Present Address:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.address)}</Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { UserViewScreen };
