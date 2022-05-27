import React, { Fragment, ReactElement } from 'react';
import {Button, Dialog, Label, SelectField, Table, Textarea, TextInputField, TrashIcon, IconButton as EverGreenIconButton} from "evergreen-ui";
import {Grid, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import {InputChangeEvent, TextareaChangeEvent} from "@/App/Types/Core";
import {ITableBookingViewState} from "@/Views/Private/Admin/TableBooking/TableBooking.View";
import {convertToNumber, convertToString} from "@/App/Functions/Custom";
import {CustomerDropdownScreen} from "@/Components/Screens/Private/Admin/Customer";
import {ICategory, ICustomer, IProduct} from "@/App/Interfaces/Models";
import {CategoryDropdownScreen} from "@/Components/Screens/Private/Admin/Category";
import {css} from "@emotion/css";

interface ITableBookingFormScreenProps {
    formData: ITableBookingViewState['form'],
    gridData: ITableBookingViewState['grid'],

    onFormStateChange(state: { [k in keyof (ITableBookingViewState)['form']]?: (ITableBookingViewState)['form'][k] }): void,

    onFormSubmit(): void,

    addFood(): void,

    foods(cate_uuid: ICategory['uuid']): void,

    handleOnChange(value: any): void,

    getCustomerInfo(uuid: ICustomer['uuid']): void,

    getProductInfo(uuid: IProduct['uuid']): void,

    onFormClose(): void,

    removeParticular(index: number): void,

    onChangeParticularData(data: { index: number, key: 'quantity', value: any }, callback?: (() => void) | undefined): void,
}


const TableBookingFormScreen: React.FC<ITableBookingFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Table Booking"
                confirmLabel="Book"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
                width={"50%"}
            >

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <div style={{fontSize:'14px', fontWeight: 500, marginBottom: 5, color: '#101840'}}>Select Customer</div>
                        <CustomerDropdownScreen
                            width={'100%'}
                            onChange={(uuid) => {
                                props.onFormStateChange({customer_uuid: uuid});
                                props.getCustomerInfo(uuid);
                            }}
                            uuid={props.formData.customer_uuid}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Name"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    name: e.target.value,
                                });
                            }}
                            value={props.formData.name}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Email"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    email: e.target.value,
                                });
                            }}
                            value={props.formData.email}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Phone"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    phone: e.target.value,
                                });
                            }}
                            value={props.formData.phone}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Parson"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    person: convertToNumber( e.target.value),
                                });
                            }}
                            value={props.formData.person}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Date"
                            type={'date'}
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    date: e.target.value,
                                });
                            }}
                            value={props.formData.date}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextInputField
                            margin={0}
                            label="Time"
                            type={'time'}
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    time: e.target.value,
                                });
                            }}
                            value={props.formData.time}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <div className="bookTable-form">
                            <SelectField width="100%" label={"Select Occasion"} onChange={(e: any) => props.onFormStateChange({occasion: e.target.value})}  margin={0}>
                                <option value="Birthday">Birthday</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Date">Date</option>
                                <option value="Special Occasion">Special Occasion</option>
                                <option value="Business Meal">Business Meal</option>
                                <option value="Other">Other</option>
                            </SelectField>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="bookTable-form" style={{marginTop: "10px"}}>
                            <Label htmlFor="textarea-2" marginBottom={4} display="block" style={{marginBottom: "10px"}}>
                                Message
                            </Label>
                            <Textarea onChange={(e: TextareaChangeEvent) => props.onFormStateChange({message: e.target.value})} value={props.formData.message} id="textarea-2" placeholder="Message..." />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <div className="bookTable-form">
                            <div >Food Category</div>
                            <CategoryDropdownScreen
                                width={"100%"}
                                uuid={convertToString(props.formData.food_category_uuid)}
                                onChange={(uuid, label) => {
                                    props.onFormStateChange({
                                        food_category_uuid: uuid,
                                        category_name: label,
                                    });

                                    props.foods(uuid);
                                }}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <div className="bookTable-form">
                            <SelectField width="100%" label={"Select Food"} margin={0} value={convertToString(props.formData.food_uuid)} onChange={(e:any) => {
                                props.onFormStateChange({food_uuid: e.target.value});
                                props.getProductInfo(e.target.value);
                            }}>
                                <option value="" selected>
                                    Select Food
                                </option>
                                {props.gridData.foods.map((item, index) => (
                                    <option key={index} value={item.uuid}>{item.title}</option>
                                ))}

                            </SelectField>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <div className="bookTable-form">
                            <TextInputField
                                label={"Quantity"}
                                width={50}
                                type={'text'}
                                disabled={props.formData.food_uuid === ""}
                                onChange={(e: InputChangeEvent) => {
                                    props.onFormStateChange({
                                        quantity: e.target.value
                                    })
                                }}
                                value={props.formData.quantity}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <div style={{marginTop: 25}}>
                            <Button onClick={props.addFood}>Add</Button>
                        </div>
                    </Grid>

                    {props.formData.booking_food_list.length > 0 &&  (
                        <Grid item  md={12} >
                            <Table>
                                <Table.Head fontSize={10} paddingLeft={0} paddingRight={0} height={30}>
                                    <Table.TextHeaderCell>Category</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Food</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Price</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Qty</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Total Price</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body>
                                    {props.formData.booking_food_list.map((item, index) => (
                                        <Table.Row height={35} key={index}>
                                            <Table.TextCell>{item.category_name}</Table.TextCell>
                                            <Table.TextCell>{item.food_name}</Table.TextCell>
                                            <Table.TextCell>{item.price}</Table.TextCell>
                                            <Table.TextCell>{item.quantity}</Table.TextCell>
                                            <Table.TextCell>{item.total_price}</Table.TextCell>
                                            <Table.TextCell>
                                            <span>
                                                <EverGreenIconButton
                                                    onClick={() => {
                                                        props.removeParticular(index);
                                                    }}
                                                    icon={TrashIcon} intent="danger" size="small"
                                                /></span>
                                            </Table.TextCell>
                                        </Table.Row>
                                    ))}

                                </Table.Body>
                            </Table>
                        </Grid>
                    )}
                </Grid>

            </Dialog>
        </Fragment>
    );
};

export { TableBookingFormScreen };
