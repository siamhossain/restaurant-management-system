import React, { Fragment, ReactElement } from 'react';
import {IWastageViewState} from "@/Views/Private/Admin/Wastage/Wastage.View";
import {IProduct} from "@/App/Interfaces/Models";
import {InputChangeEvent} from "@/App/Types/Core";
import {convertToNumber, parseDate} from "@/App/Functions/Custom";
import {Dialog, Table, TextInputField, IconButton as EverGreenIconButton, TrashIcon} from "evergreen-ui";
import {ProductDropdownScreen} from "@/Components/Screens/Private/Admin/Product";
import {css} from "@emotion/css";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";

interface IWastageFormScreenProps {
    formData: IWastageViewState['form'],

    onFormStateChange(state: { [k in keyof (IWastageViewState)['form']]?: (IWastageViewState)['form'][k] }, callback?: undefined | (() => void)): void,

    onFormSubmit(): void,

    onFormClose(): void,

    onPaymentCalculation(): void,

    onSelectProduct(product_uuid: IProduct['uuid']): void,

    onDeleteParticular(index: number): void,

    onChangeParticularData(data: { index: number, key: 'qty' | 'unit_price', value: any }, callback?: (() => void) | undefined): void,
}
const WastageFormScreen: React.FC<IWastageFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Wastage Entry"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
                width={1200}>

                <Grid container spacing={1}>
                    <Grid item sm={2}>
                        <div className={css`position: relative;`}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Date</div>
                            <Datetime
                                value={props.formData.date}
                                onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                                timeFormat={false}
                                dateFormat={"DD/MM/YYYY"}
                                className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={3}>
                        <div className={css`input {background: #f8c8c8; font-weight: bold;`}>
                            <TextInputField
                                label="Total Amount"
                                value={convertToNumber(props.formData.total_amount).toFixed(2)}
                                disabled={true}
                            />
                        </div>
                    </Grid>


                    <Grid item sm={4}>
                        <div className={css`position: relative;`}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Product
                            </div>
                            <ProductDropdownScreen
                                width={"100%"}
                                onChange={(uuid) => props.onSelectProduct(uuid)}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={12}>
                        <Table>
                            <Table.Head height={30}>
                                <Table.TextHeaderCell>Product Name</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Purchase Price</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Total Price</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body height={240}>
                                {props.formData.particulars.map((particular, index) => (
                                    <Table.Row key={index} height={30}>
                                        <Table.TextCell>{particular.product_title}</Table.TextCell>
                                        <Table.TextCell isNumber>
                                            <input
                                                style={{
                                                    width: 50,
                                                    border: "1px solid #000000",
                                                    borderRadius: 2,
                                                    textAlign: "center"
                                                }}
                                                value={particular.qty}
                                                onChange={(e: InputChangeEvent) => props.onChangeParticularData({
                                                    index,
                                                    key: "qty",
                                                    value: (e.target.value as any),
                                                })}
                                            />
                                        </Table.TextCell>
                                        <Table.TextCell isNumber>
                                            <input
                                                style={{
                                                    width: 100,
                                                    border: "1px solid #000000",
                                                    borderRadius: 2,
                                                    textAlign: "right"
                                                }}
                                                value={particular.unit_price}
                                                onChange={(e: InputChangeEvent) => props.onChangeParticularData({
                                                    index,
                                                    key: "unit_price",
                                                    value: (e.target.value as any),
                                                })}
                                            />
                                        </Table.TextCell>
                                        <Table.TextCell
                                            isNumber>{convertToNumber(particular.total_amount).toFixed(2)}</Table.TextCell>
                                        <Table.TextCell>
                                            <EverGreenIconButton
                                                onClick={() => props.onDeleteParticular(index)}
                                                icon={TrashIcon} intent="danger" size="small"
                                            />
                                        </Table.TextCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid>
                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { WastageFormScreen };
