import React, { Fragment, ReactElement } from 'react';
import {IDueInvoiceViewState} from "@/Views/Private/Admin/DueInvoice/DueInvoice.View";
import {convertToNumber, convertToString, parseDate} from "@/App/Functions/Custom";
import Datetime from 'react-datetime';
import {Dialog, Select, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {css} from "@emotion/css";
import {CustomerDropdownScreen} from "@/Components/Screens/Private/Admin/Customer";
import {SupplierDropdownScreen} from "@/Components/Screens/Private/Admin/Supplier/SupplierDropdown.Screen";
import {InputChangeEvent} from "@/App/Types/Core";

interface IDueInvoiceFormScreenProps {
    formData: IDueInvoiceViewState['form'],
    gridData: IDueInvoiceViewState['grid'],

    onFormStateChange(state: { [k in keyof (IDueInvoiceViewState)['form']]?: (IDueInvoiceViewState)['form'][k] }): void,

    onFormSubmit(): void,

    onFormClose(): void,
}
const DueInvoiceFormScreen: React.FC<IDueInvoiceFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Due Entry"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
            >
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className={css `position: relative;`}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, }}>Date</div>
                            <Datetime
                                value={parseDate(props.formData.date)}
                                onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                                timeFormat={false}
                                dateFormat={"DD/MM/YYYY"}
                                className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                            />
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Participant Type</div>
                        <Select
                            value={props.formData.participant_type}
                            onChange={(event: any) => props.onFormStateChange({
                                participant_type: event.target.value,
                                participant_uuid: '',
                            })}
                            width={"100%"}>
                            <option value="">Select Participant Type</option>
                            <option value="Customer">Customer</option>
                            <option value="Supplier">Supplier</option>
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {props.formData.participant_type != '' && (
                            <>
                                <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Select {props.formData.participant_type}</div>
                                {props.formData.participant_type === 'Customer' ? (
                                    <CustomerDropdownScreen
                                        width={'100%'}
                                        uuid={convertToString(props.formData.participant_uuid)}
                                        onChange={(uuid) => props.onFormStateChange({participant_uuid: uuid})}
                                    />
                                ) : (
                                    <SupplierDropdownScreen
                                        width={'100%'}
                                        uuid={convertToString(props.formData.participant_uuid)}
                                        onChange={(uuid) => props.onFormStateChange({participant_uuid: uuid})}
                                    />
                                )}
                            </>
                        )}
                    </Grid>


                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextInputField
                            label="Amount"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    amount: e.target.value,
                                });
                            }}

                            value={props.formData.amount}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextInputField
                            label="Comment"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    comment: e.target.value,
                                });
                            }}

                            value={convertToString(props.formData.comment)}
                        />
                    </Grid>

                </Grid>

            </Dialog>
        </Fragment>
    );
};

export { DueInvoiceFormScreen };
