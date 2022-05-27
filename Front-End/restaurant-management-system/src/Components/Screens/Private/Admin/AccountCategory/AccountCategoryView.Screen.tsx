import React, { Fragment, ReactElement } from 'react';
import {IAccountCategoryViewState} from "@/Views/Private/Admin/AccountCategory/AccountCategory.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";

interface IAccountCategoryViewScreenProps {
    viewData: IAccountCategoryViewState['view'],
    onViewClose(): void,
}
const AccountCategoryViewScreen: React.FC<IAccountCategoryViewScreenProps> = (props): ReactElement => {
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
                        <Table.TextHeaderCell>Type:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.type)}</Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { AccountCategoryViewScreen };
