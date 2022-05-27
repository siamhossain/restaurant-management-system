import React, { Fragment, ReactElement } from 'react';
import {Dialog, Select, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {IUserViewState} from "@/Views/Private/Admin/User/User.View";

interface IUserFormScreenProps {
    formData: IUserViewState['form'],
    gridData: IUserViewState['grid'],

    onFormStateChange(state: { [k in keyof (IUserViewState)['form']]?: (IUserViewState)['form'][k] }): void,

    onFormClose(): void,

    onFormSubmit(): void,
}
const UserFormScreen: React.FC<IUserFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="User Entry"
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
                                    name: convertToString(e.target.value),
                                });
                            }}
                            value={props.formData.name}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Username"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    username: e.target.value,
                                });
                            }}
                            value={props.formData.username}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Phone Number"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    phone: e.target.value,
                                });
                            }}
                            value={props.formData.phone}
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
                            value={props.formData.email}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextInputField
                            label="Address"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    address: e.target.value,
                                });
                            }}
                            value={props.formData.address}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Select User Role</div>
                        <Select
                            value={props.formData.role_id}
                            onChange={(event: any) => props.onFormStateChange({role_id: event.target.value})}
                            width={"100%"}>
                            <option value="">Select User Role</option>
                            {props.gridData.user_roles.map((item, index) => (
                                <option key={index} value={item.id}>{item.title}</option>
                            ))}

                        </Select>
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
                                value={props.formData.password}
                            />
                        </Grid>
                    )}

                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Status</div>
                        <Select
                            value={props.formData.status}
                            onChange={(event: any) => props.onFormStateChange({status: event.target.value})}
                            width={"100%"}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                        </Select>
                    </Grid>

                </Grid>
            </Dialog>
        </Fragment>
    );
};
export { UserFormScreen };
