import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {IIngredientUsesViewState} from "@/Views/Private/Admin/IngredientUses/IngredientUses.View";

interface IIngredientUsesViewScreenProps {
    viewData: IIngredientUsesViewState['view'],
    onViewClose(): void,
}
const IngredientUsesViewScreen: React.FC<IIngredientUsesViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Unit View"
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
                        <Table.TextCell>{echo(props.viewData.data?.ingredient?.title)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Date:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.date)}</Table.TextCell>
                        <Table.TextHeaderCell>Quantity:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.quantity)}</Table.TextCell>
                    </Table.Row>

                </Table>
            </Dialog>
        </Fragment>
    );
};

export { IngredientUsesViewScreen };
