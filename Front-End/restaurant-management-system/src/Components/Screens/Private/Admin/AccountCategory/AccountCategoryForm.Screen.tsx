import React, { Fragment, ReactElement } from 'react';
import {Grid} from "@material-ui/core";
import {Dialog, Select, TextInputField} from "evergreen-ui";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {IAccountCategoryViewState} from "@/Views/Private/Admin/AccountCategory/AccountCategory.View";

interface IAccountCategoryFormScreenProps {
    formData: IAccountCategoryViewState['form'],

    onFormStateChange(state: { [k in keyof (IAccountCategoryViewState)['form']]?: (IAccountCategoryViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
    onCheckSlug?(): void,
}
const AccountCategoryFormScreen: React.FC<IAccountCategoryFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Account Category Entry"
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
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Type</div>
                        <Select
                            disabled={props.formData.is_edit}
                            value={props.formData.type}
                            onChange={(event: any) => props.onFormStateChange({type: event.target.value})}
                            width={"100%"}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </Select>

                    </Grid>
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

export { AccountCategoryFormScreen };
