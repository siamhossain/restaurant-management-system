import React, { Fragment, ReactElement } from 'react';
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {IBrandViewState} from "@/Views/Private/Admin/Brand/Brand.View";

interface IBrandViewScreenProps {
    viewData: IBrandViewState['view'],

    onViewClose(): void,
}
const BrandViewScreen: React.FC<IBrandViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Brand View"
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
                        <Table.TextHeaderCell>Slug:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.slug)}</Table.TextCell>
                        <Table.TextHeaderCell>Brand Logo:</Table.TextHeaderCell>
                        <Table.TextCell>
                            {echo(props.viewData.data?.logo_uri) !== "" && (
                                <div style={{marginTop: 10, marginBottom: 10}}>
                                    <img src={cdn(echo(props.viewData.data?.logo_uri))}
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

export { BrandViewScreen };
