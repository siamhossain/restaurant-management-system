import React, { Fragment, ReactElement } from 'react';
import {IUserRoleViewState} from "@/Views/Private/Admin/UserRole/UserRole.View";
import {Dialog, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";

interface IUserRoleFormScreenProps {
    formData: IUserRoleViewState['form'],

    onFormStateChange(state: { [k in keyof (IUserRoleViewState)['form']]?: (IUserRoleViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
    onCheckSlug?(): void,
}
const UserRoleFormScreen: React.FC<IUserRoleFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="User Role Entry"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                preventBodyScrolling={true}
                onCloseComplete={() => {
                    props.onFormClose();
                }}

            >
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <TextInputField
                            label="Name"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    title: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.title)}
                        />
                    </Grid>

                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { UserRoleFormScreen };
