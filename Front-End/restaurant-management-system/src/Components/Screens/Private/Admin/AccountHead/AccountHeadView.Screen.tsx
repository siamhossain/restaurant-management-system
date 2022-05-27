import React, { Fragment, ReactElement } from 'react';
import {IAccountCategoryViewState} from "@/Views/Private/Admin/AccountCategory/AccountCategory.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {IAccountHeadViewState} from "@/Views/Private/Admin/AccountHead/AccountHead.View";

interface IAccountHeadViewScreenProps {
    viewData: IAccountHeadViewState['view'],
    onViewClose(): void,
}
const AccountHeadViewScreen: React.FC<IAccountHeadViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Account Category View"
                hasCancel={false}
                confirmLabel={"Close"}
                shouldCloseOnOverlayClick={true}
                onCloseComplete={() => props.onViewClose()}
                width={'50%'}
            >
                <Table style={{width: '100%', textAlign: 'left'}}>
                    <Table.Row>
                        <Table.TextHeaderCell>Name:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Category Name:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.account_category?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Type:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.type)}</Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { AccountHeadViewScreen };
