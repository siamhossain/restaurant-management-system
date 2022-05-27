import React, { Fragment, ReactElement } from 'react';
import {ISupplier} from "@/App/Interfaces/Models";
import {ISupplierPaymentViewState} from "@/Views/Private/Admin/SupplierPayment/SupplierPayment.View";
import {Dialog, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";
import {convertToNumber, convertToString, parseDate} from "@/App/Functions/Custom";
import {css} from "@emotion/css";
import {SupplierDropdownScreen} from "@/Components/Screens/Private/Admin/Supplier/SupplierDropdown.Screen";

interface ISupplierPaymentFormScreenProps {
    formData: ISupplierPaymentViewState['form'],

    onFormStateChange(state: { [k in keyof (ISupplierPaymentViewState)['form']]?: (ISupplierPaymentViewState)['form'][k] }): void,

    onFormClose(): void,

    SupplierDue(supplier_uuid: ISupplier['uuid']): void,

    onFormSubmit(): void,
}
const SupplierPaymentFormScreen: React.FC<ISupplierPaymentFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Supplier Payment"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
            >
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Date</div>
                        <Datetime
                            value={parseDate(props.formData.date)}
                            onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                            timeFormat={false}
                            dateFormat={"DD/MM/YYYY"}
                            className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select
                            Supplier <abbr style={{color: 'red'}}>*</abbr></div>
                        <SupplierDropdownScreen
                            width={'100%'}
                            uuid={props.formData.supplier_uuid}
                            onChange={(uuid) => {
                                props.onFormStateChange({
                                    supplier_uuid: uuid,
                                });
                                props.SupplierDue(uuid);
                            }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <div style={{border: "1px solid #eeeeee", borderRadius: 4, padding: "5px 10px"}}>
                            <div>Total Due</div>
                            <h2 style={{margin:0, color: 'red'}}>{props.formData.supplier_due}</h2>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextInputField
                            disabled={props.formData.supplier_uuid === ""}
                            label={"Received Amount"}
                            value={props.formData.paid_amount}
                            onChange={(e: any) => props.onFormStateChange({paid_amount: e.target.value})}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextInputField
                            label={"After Receive DueInvoice"}
                            value={convertToNumber(props.formData.supplier_due) - convertToNumber(props.formData.paid_amount)}
                            disabled
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextInputField
                            label={"Note"}
                            value={convertToString(props.formData.note)}
                            onChange={(e: any) => props.onFormStateChange({note: e.target.value})}
                        />
                    </Grid>
                </Grid>

            </Dialog>
        </Fragment>
    );
};

export { SupplierPaymentFormScreen };
