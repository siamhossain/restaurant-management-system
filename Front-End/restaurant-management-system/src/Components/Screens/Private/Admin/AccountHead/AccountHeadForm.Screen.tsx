import React, { Fragment, ReactElement } from 'react';
import {Dialog, Select, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {AccountCategoryDropdownScreen} from "@/Components/Screens/Private/Admin/AccountCategory";
import {IAccountHeadViewState} from "@/Views/Private/Admin/AccountHead/AccountHead.View";

interface IAccountHeadFormScreenProps {
    formData: IAccountHeadViewState['form'],

    onFormStateChange(state: { [k in keyof (IAccountHeadViewState)['form']]?: (IAccountHeadViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
    onCheckSlug?(): void,
}
const AccountHeadFormScreen: React.FC<IAccountHeadFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Account Head Entry"
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
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Category</div>
                        <AccountCategoryDropdownScreen
                            uuid={props.formData.account_category_uuid}
                            onChange={(uuid) => props.onFormStateChange({account_category_uuid: uuid})}
                            width={'100%'}
                            type={props.formData.type}
                            disabled={props.formData.uuid !== ''}
                        />
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

export { AccountHeadFormScreen };
