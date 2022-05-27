import React, { Fragment, ReactElement } from 'react';
import {Dialog, FilePicker, Select, Spinner, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {css} from "@emotion/css";
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {ISupplierViewState} from "@/Views/Private/Admin/Supplier/Supplier.View";

interface ISupplierFormScreenProps {
    formData: ISupplierViewState['form'],

    onFormStateChange(state: { [k in keyof (ISupplierViewState)['form']]?: (ISupplierViewState)['form'][k] }): void,

    onFormClose(): void,

    onFormSubmit(): void,
}
const SupplierFormScreen:React.FC<ISupplierFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Supplier Entry"
                confirmLabel="Save"
                isConfirmLoading={props.formData.is_uploading}
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                preventBodyScrolling={true}
                onCloseComplete={() => {
                    props.onFormClose();
                }}
                width={"40%"}
            >
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Full Name"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    full_name: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.full_name)}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Phone Number"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    phone_number: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.phone_number)}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Email Address"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    email: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.email)}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Present Address"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    address: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.address)}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <TextInputField
                            label="Area Code"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    area_code: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.area_code)}
                        />
                    </Grid>
                    {!props.formData.is_edit && (
                        <Grid item sm={6}>
                            <TextInputField
                                label="Password"
                                onChange={(e: InputChangeEvent) => {
                                    props.onFormStateChange({
                                        password: e.target.value,
                                    });
                                }}
                                value={convertToString(props.formData.password)}
                            />
                        </Grid>
                    )}

                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500}}>Select Profile Photo</div>
                        <div className={css`input {width: 100% !important;}`}>
                            <FilePicker
                                onChange={files => {
                                    props.onFormStateChange({is_uploading: true, profile_image_uri: ''});
                                    UploaderProvider.upload("customer", files[0], (data: any) => {
                                        props.onFormStateChange({
                                            profile_image_uri: data.data.path,
                                            is_uploading: false,
                                        });
                                    });
                                }}
                                placeholder=""
                            />
                        </div>
                        {props.formData.is_uploading && (
                            <Spinner marginX="auto" marginY={20}/>
                        )}

                        {convertToString(props.formData.profile_image_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <img src={cdn(props.formData.profile_image_uri)} style={{borderRadius: 5, width: 200}}
                                     alt={""}/>
                                <div>
                                    <span
                                        style={{color: "red", cursor: "pointer", fontSize: 14}}
                                        onClick={() => props.onFormStateChange({profile_image_uri: ""})}>
                                        Remove Photo
                                    </span>
                                </div>
                            </div>
                        )}
                    </Grid>
                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Status</div>
                        <Select
                            value={props.formData.status}
                            onChange={(event: any) => props.onFormStateChange({status: event.target.value})}
                            width={"100%"}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                            <option value="Pending">Pending</option>
                        </Select>
                    </Grid>

                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { SupplierFormScreen };
