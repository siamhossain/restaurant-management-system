import React, { Fragment, ReactElement } from 'react';
import {Grid} from "@material-ui/core";
import {Dialog, TextInputField} from "evergreen-ui";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {IUnitViewState} from "@/Views/Private/Admin/Unit/Unit.View";

interface IUnitFormScreenProps {
    formData: IUnitViewState['form'],

    onFormStateChange(state: { [k in keyof (IUnitViewState)['form']]?: (IUnitViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
    onCheckSlug?(): void,
}
const UnitFormScreen: React.FC<IUnitFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Unit Entry"
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
                                    name: e.target.value,
                                });
                            }}
                            value={convertToString(props.formData.name)}
                        />
                    </Grid>

                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { UnitFormScreen };
