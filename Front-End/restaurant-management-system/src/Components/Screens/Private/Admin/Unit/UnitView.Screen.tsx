import React, { Fragment, ReactElement } from 'react';
import {IUnitViewState} from "@/Views/Private/Admin/Unit/Unit.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";

interface IUnitViewScreenProps {
    viewData: IUnitViewState['view'],
    onViewClose(): void,
}

const UnitViewScreen: React.FC<IUnitViewScreenProps> = (props): ReactElement => {
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
                        <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { UnitViewScreen };
