import React, { Fragment, ReactElement } from 'react';
import {Grid} from "@material-ui/core";
import {Dialog, TextInputField} from "evergreen-ui";
import {IngredientDropdownScreen} from "@/Components/Screens/Private/Admin/Ingredient/IngredientDropdown.Screen";
import {IIngredientUsesViewState} from "@/Views/Private/Admin/IngredientUses/IngredientUses.View";
import {IIngredientUses} from "@/App/Interfaces/Models";
import Datetime from "react-datetime";
import {parseDate} from "@/App/Functions/Custom";
import {css} from "@emotion/css";

interface IIngredientUsesFormScreenProps {
    formData: IIngredientUsesViewState['form'],

    onFormStateChange(state: { [k in keyof (IIngredientUsesViewState)['form']]?: (IIngredientUsesViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    checkStock(uuid: IIngredientUses['ingredient_uuid']): void,

    onFormSubmit(): void,
}
const IngredientUsesFormScreen: React.FC<IIngredientUsesFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Ingredient Uses Entry"
                confirmLabel="Save"
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
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Date</div>
                        <Datetime
                            value={parseDate(props.formData.date)}
                            onChange={(date: any) => props.onFormStateChange({date: parseDate(date)})}
                            timeFormat={false}
                            dateFormat={"DD/MM/YYYY"}
                            className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                        />
                    </Grid>

                    <Grid item sm={6}>
                        <div style={{
                            color: "#101840",
                            fontSize: 14,
                            fontWeight: 500,
                            marginBottom: '5px'
                        }}>
                            Select Ingredient
                        </div>
                        <IngredientDropdownScreen
                            width={'100%'}
                            uuid={props.formData.ingredient_uuid}
                            onChange={(uuid) => {
                                props.onFormStateChange({ingredient_uuid: uuid});
                                props.checkStock(uuid);
                            }}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <TextInputField
                            label={'Quantity ' + '(' +props.formData.stock+ ')'}
                            value={props.formData.quantity}
                            onChange={(e: any) => props.onFormStateChange({quantity: e.target.value})}
                        />
                    </Grid>


                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { IngredientUsesFormScreen };
