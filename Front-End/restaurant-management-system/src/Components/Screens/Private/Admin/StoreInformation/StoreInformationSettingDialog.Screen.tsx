import React, { Fragment, ReactElement } from 'react';
import {Dialog, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";

interface IStoreInformationSettingDialogScreenProps {
    open: boolean,
    name: string,
    email: string,
    phone: string,
    address: string,
    onSubmit(): void,
    onViewClose(): void,
    onStateChange(key: any, value: any): void,
}

const StoreInformationSettingDialogScreen: React.FC<IStoreInformationSettingDialogScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
                <Dialog
                    isShown={props.open}
                    title="Restaurant Setup"
                    confirmLabel="Setup"
                    hasCancel={false}
                    intent={"success"}
                    hasClose={false}
                    shouldCloseOnOverlayClick={false}
                    onConfirm={props.onSubmit}
                    preventBodyScrolling={true}
                    onCloseComplete={() => {
                        props.onViewClose();
                    }}
                    width={"40%"}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <TextInputField
                                label=" Name"
                                onChange={(e: InputChangeEvent) => {
                                    props.onStateChange( 'name', e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInputField
                                label=" Slogan"
                                onChange={(e: InputChangeEvent) => {
                                    props.onStateChange( 'slogan', e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInputField
                                label=" Email"
                                onChange={(e: InputChangeEvent) => {
                                    props.onStateChange( 'email', e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInputField
                                label=" Phone"
                                onChange={(e: InputChangeEvent) => {
                                    props.onStateChange( 'phone', e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInputField
                                label=" Address"
                                onChange={(e: InputChangeEvent) => {
                                    props.onStateChange( 'address', e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Dialog>
        </Fragment>
    );
};

export { StoreInformationSettingDialogScreen };
