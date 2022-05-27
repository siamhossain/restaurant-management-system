import React, { Fragment, ReactElement } from 'react';
import {IProductViewState} from "@/Views/Private/Admin/Product/Product.View";
import {Dialog, Table} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {Image} from "@/Components/Core/Image";
import {cdn} from "@/App/Functions/Custom/cdn.Function";

interface IProductViewScreenProps {
    viewData: IProductViewState['view'],
    onViewClose(): void,
}
const ProductViewScreen: React.FC<IProductViewScreenProps> = (props): ReactElement => {
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
                        <Table.TextCell>{echo(props.viewData.data?.title)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Unit:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.unit?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Category:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.category?.name)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Brand:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.brand?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Sale Price:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.sales_price)}</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextHeaderCell>Purchase Price:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.purchase_price)}</Table.TextCell>
                        <Table.TextHeaderCell>Featured:</Table.TextHeaderCell>
                        <Table.TextCell>
                            {echo(props.viewData.data?.featured_image_uri) !== "" && (
                                <div style={{marginTop: 10, marginBottom: 10}}>
                                    <Image src={cdn(echo(props.viewData.data?.featured_image_uri))} style={{borderRadius: 5, width: 200}} alt={""}/>
                                </div>
                            )}
                        </Table.TextCell>

                    </Table.Row>
                </Table>
            </Dialog>
        </Fragment>
    );
};

export { ProductViewScreen };
