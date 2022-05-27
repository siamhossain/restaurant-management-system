import React, { Fragment, ReactElement } from 'react';
import {
    IAccountingHistoryViewProps,
    IAccountingHistoryViewState
} from "@/Views/Private/Admin/AccountingHistory/AccountingHistory.View";
import { parseDate } from '@/App/Functions/Custom/parseDate.Function';
import {Dialog, Select, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {AccountCategoryDropdownScreen} from "@/Components/Screens/Private/Admin/AccountCategory";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {convertToNumber} from "@/App/Functions/Custom";
import {css} from "@emotion/css";
import Datetime from 'react-datetime';
import {AccountHeadDropdownScreen} from "@/Components/Screens/Private/Admin/AccountHead/AccountHeadDropdown.Screen";

interface IAccountingHistoryFormScreenProps {
    formData: IAccountingHistoryViewState['form'],
    type: IAccountingHistoryViewProps['type'],

    onFormStateChange(state: { [k in keyof (IAccountingHistoryViewState)['form']]?: (IAccountingHistoryViewState)['form'][k] }, callback?: undefined | (() => void)): void,

    saveAccountingHistory(): void,
    onFormClose(): void,

}
const AccountingHistoryFormScreen: React.FC<IAccountingHistoryFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title={props.type === 'Income' ? 'Income Entry' : 'Expense Entry'}
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.saveAccountingHistory}
                onCloseComplete={() => props.onFormClose()}>
                <Grid container spacing={2} style={{position: 'relative'}}>

                    <Grid item sm={6}>
                        <div className={css `position: relative;`}>
                            <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Date</div>
                            <Datetime
                                value={parseDate(props.formData.date)}
                                onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                                timeFormat={false}
                                dateFormat={"DD/MM/YYYY"}
                                className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                            />
                        </div>
                    </Grid>

                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: '8px'}}>Type</div>
                        <Select
                            disabled={true}
                            value={props.formData.type}
                            onChange={(event: any) => props.onFormStateChange({type: event.target.value})}
                            width={"100%"}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </Select>
                    </Grid>
                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Select Account Category</div>

                        <AccountCategoryDropdownScreen
                            type={props.formData.type}
                            width={"100%"}
                            uuid={props.formData.account_category_uuid}
                            onChange={(uuid, label) => props.onFormStateChange({
                                account_category_uuid: uuid,
                                account_category_name: label,
                            })}
                        />

                    </Grid>
                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Select Account Head</div>
                        <AccountHeadDropdownScreen
                            type={props.formData.type}
                            width={'100%'}
                            uuid={props.formData.account_head_uuid}
                            onChange={(uuid, label) => props.onFormStateChange({
                                account_head_uuid: uuid,
                                account_head_name: label,
                            })}
                        />

                    </Grid>

                    <Grid item sm={6}>
                        <TextInputField
                            label="Comment"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    comment: convertToString(e.target.value),
                                });
                            }}
                            value={convertToString(props.formData.comment)}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <TextInputField
                            label="Total Amount"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    total_amount: e.target.value,
                                });
                            }}
                            value={props.formData.total_amount}
                        />
                    </Grid>
                </Grid>

            </Dialog>
        </Fragment>
    );
};



export { AccountingHistoryFormScreen };
