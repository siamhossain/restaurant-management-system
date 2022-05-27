import React, { Fragment, ReactElement } from 'react';
import {IProduct, IPurchaseOrder} from "@/App/Interfaces/Models";
import {Dialog, IconButton as EverGreenIconButton, Select, Table, TextInputField, TrashIcon} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {css} from "@emotion/css";
import {SupplierDropdownScreen} from "@/Components/Screens/Private/Admin/Supplier/SupplierDropdown.Screen";
import {SelectChangeEvent} from "@/App/Types/Core/SelectChangeEvent.Type";
import {convertToNumber} from "@/App/Functions/Custom";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {ProductDropdownScreen} from "@/Components/Screens/Private/Admin/Product";
import {IPurchaseOrderReturnViewState} from "@/Views/Private/Admin/PurchaseOrderReturn/PurchaseOrderReturn.View";

interface IPurchaseOrderReturnFormScreenProps {
    formData: IPurchaseOrderReturnViewState['form'],

    onFormStateChange(state: { [k in keyof (IPurchaseOrderReturnViewState)['form']]?: (IPurchaseOrderReturnViewState)['form'][k] }, callback?: undefined | (() => void)): void,

    onFormSubmit(): void,

    onFormClose(): void,

    onPaymentCalculation(): void,

    onSelectProduct(product_uuid: IProduct['uuid']): void,

    onDeleteParticular(index: number): void,

    onChangeParticularData(data: { index: number, key: 'quantity' | 'unit_price' | 'expire_date', value: any }, callback?: (() => void) | undefined): void,
}

const PurchaseOrderReturnFormScreen: React.FC<IPurchaseOrderReturnFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Purchase Order Entry"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
                width={1200}>

                <Grid container spacing={1}>
                    <Grid item sm={2}>
                        <div style={{position: 'relative'}}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Date</div>
                            <Datetime
                                value={props.formData.date}
                                onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                                timeFormat={false}
                                dateFormat={"DD/MM/YYYY"}
                                className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px;  left: 0; right: 0; * {outline: 0}`}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={4}>
                        <div className={css`position: relative;`}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Supplier
                            </div>
                            <SupplierDropdownScreen
                                width={"100%"}
                                uuid={props.formData.supplier_uuid}
                                onChange={(uuid) => props.onFormStateChange({
                                    supplier_uuid: uuid,
                                })}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={3}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Payment Type
                        </div>
                        <Select
                            width="100%"
                            onChange={(e: SelectChangeEvent) => {
                                const value: IPurchaseOrder['payment_type'] = e.target.value === "Credit" ? "Credit" : "Cash";
                                props.onFormStateChange({
                                    payment_type: value,
                                }, props.onPaymentCalculation);
                            }}
                            value={props.formData.payment_type}>
                            <option value="Cash" selected>Cash</option>
                            <option value="Credit" selected>Credit</option>
                        </Select>
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

                    <Grid item sm={2}>
                        <TextInputField
                            label="Discount"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    discount: (e.target.value as any),
                                }, props.onPaymentCalculation);
                            }}
                            value={props.formData.discount}
                        />
                    </Grid>

                    <Grid item sm={2}>
                        <TextInputField
                            label="Tax"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    tax: (e.target.value as any),
                                }, props.onPaymentCalculation);
                            }}
                            value={props.formData.tax}
                        />
                    </Grid>

                    <Grid item sm={3}>
                        <div className={css`input {background: #fff2c3; font-weight: bold; font-size: 20px;`}>
                            <TextInputField
                                label="Payment Amount"
                                value={convertToNumber(props.formData.payable_amount).toFixed(2)}
                            />
                        </div>
                    </Grid>


                    {props.formData.payment_type === "Cash" ? (
                        <React.Fragment>
                            <Grid item sm={3}>
                                <TextInputField
                                    label="Received Amount"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            received_amount: (e.target.value as any),
                                        }, props.onPaymentCalculation);
                                    }}
                                    value={props.formData.received_amount}
                                />
                            </Grid>

                            <Grid item sm={2}>
                                <TextInputField
                                    label="Return Amount"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            received_amount: (e.target.value as any),
                                        }, props.onPaymentCalculation);
                                    }}
                                    value={props.formData.return_amount}
                                />
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Grid item sm={3}>
                                <TextInputField
                                    label="Paid Amount"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            paid_amount: (e.target.value as any),
                                        }, props.onPaymentCalculation);
                                    }}
                                    value={props.formData.paid_amount}
                                />
                            </Grid>

                            <Grid item sm={2}>
                                <div className={css`input {background: #f8c8c8; font-weight: bold;`}>
                                    <TextInputField
                                        label="Due Amount"
                                        onChange={(e: InputChangeEvent) => {
                                            props.onFormStateChange({
                                                due_amount: (e.target.value as any),
                                            }, props.onPaymentCalculation);
                                        }}
                                        value={convertToNumber(props.formData.due_amount).toFixed(2)}
                                    />
                                </div>
                            </Grid>
                        </React.Fragment>
                    )}


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
                                <Table.TextHeaderCell>Code</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Purchase Price</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Total Price</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body height={240}>
                                {props.formData.particulars.map((particular, index) => (
                                    <Table.Row key={index} height={30}>
                                        <Table.TextCell>{particular.product_name}</Table.TextCell>
                                        <Table.TextCell>{particular.product_code}</Table.TextCell>
                                        <Table.TextCell isNumber>
                                            <input
                                                style={{
                                                    width: 50,
                                                    border: "1px solid #000000",
                                                    borderRadius: 2,
                                                    textAlign: "center"
                                                }}
                                                value={particular.quantity}
                                                onChange={(e: InputChangeEvent) => props.onChangeParticularData({
                                                    index,
                                                    key: "quantity",
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
                                        <Table.TextCell isNumber>
                                            {convertToNumber(particular.total_price).toFixed(2)}
                                        </Table.TextCell>
                                        {/* <Table.TextCell>
                                            <div
                                                className={css`.rdtPicker {position: fixed; z-index: 9999 !important;}`}>
                                                <Datetime
                                                    value={particular.expire_date as any}
                                                    onChange={(date: any) => {
                                                        props.onChangeParticularData({
                                                            index,
                                                            key: "expire_date",
                                                            value: convertToString(date) === "" ? "" : parseDate(date),
                                                        })
                                                    }}
                                                    timeFormat={false}
                                                    dateFormat={"DD/MM/YYYY"}
                                                    className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}
                                                />
                                            </div>
                                        </Table.TextCell>*/}
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

export { PurchaseOrderReturnFormScreen };
