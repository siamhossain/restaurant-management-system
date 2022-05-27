import React, { Fragment, ReactElement } from 'react';
import {ITableBookingViewState} from "@/Views/Private/Admin/TableBooking/TableBooking.View";
import {Button, Dialog, Select, Table, TickIcon} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom";
import {IBookingFoodList} from "@/App/Interfaces/Models";
import {DataGrid} from "@/Components/Core/DataGrid";

interface IBookingFoodToKitchenViewScreenProps {
    viewData: ITableBookingViewState['view'],
    onViewClose(): void,
    onReload(): void,
    foodStatusUpdate(uuid: IBookingFoodList['uuid'], status: IBookingFoodList['status']): void,
}
const BookingFoodToKitchenViewScreen: React.FC<IBookingFoodToKitchenViewScreenProps> = (props): ReactElement => {
    const particulars = props.viewData?.data?.booking_food_list;
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Table Booking View"
                hasCancel={false}
                confirmLabel={"Close"}
                shouldCloseOnOverlayClick={true}
                onCloseComplete={() => props.onViewClose()}
                width={'50%'}
            >
                <Table style={{width: '100%', textAlign: 'left'}}>
                    <Table.Row>
                        <Table.TextHeaderCell>Customer:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
                        <Table.TextHeaderCell>Date:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.date)}</Table.TextCell>
                        <Table.TextHeaderCell>Time:</Table.TextHeaderCell>
                        <Table.TextCell>{echo(props.viewData.data?.time)}</Table.TextCell>


                    </Table.Row>

                    <table style={{width: "100%"}}>
                        <thead style={{backgroundColor: '#c9c9c9', fontSize: '14px'}}>
                        <th>Category Name</th>
                        <th>Food Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                        </thead>
                        <tbody>


                        {particulars?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category_name}</td>
                                <td>{item.food_name}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Select
                                        value={item.status}
                                        onChange={(event: any) => {
                                            props.foodStatusUpdate(item.uuid, event.target.value);
                                            props.onViewClose();
                                        }}

                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Inprogress">In progress</option>
                                        <option value="Ready">Ready</option>
                                        <option value="Served">Served</option>
                                    </Select>
                                    {/*{item.status === 'Inprogress' ? (*/}
                                    {/*    <Button  onClick={() => {*/}
                                    {/*        props.foodStatusUpdate(item.uuid);*/}
                                    {/*        props.onViewClose();*/}
                                    {/*    }} size={'small'} title={"Ready"} iconAfter={TickIcon} intent="success" >Ready</Button>*/}
                                    {/*) : (*/}
                                    {/*    <Button disabled size={'small'} title={"Ready"}  intent="danger" >Served</Button>*/}
                                    {/*)}*/}

                                </td>

                            </tr>
                        ))}


                        </tbody>
                    </table>

                </Table>
            </Dialog>
        </Fragment>
    );
};

export { BookingFoodToKitchenViewScreen };
