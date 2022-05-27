import { DataGrid } from '@/Components/Core/DataGrid';
import React, { Fragment, ReactElement } from 'react';
import {OrderDetailsStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Customer/OrderDetails";

const OrderDetailsScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={OrderDetailsStyleSheet.classes.root}>
                <span>Order #8314 was placed on October 21, 2021 and is currently On hold</span>
                <h1>Order details</h1>
                <DataGrid.Wrapper>
                    <DataGrid.Container>
                        <DataGrid.Body>
                            <DataGrid.Row>
                                <DataGrid.Heading width={150}>Product</DataGrid.Heading>
                                <DataGrid.Data >Fried Chicken × 3</DataGrid.Data>
                            </DataGrid.Row>

                            <DataGrid.Row>
                                <DataGrid.Heading>Sub Total</DataGrid.Heading>
                                <DataGrid.Data>1245 tk</DataGrid.Data>
                            </DataGrid.Row>

                            <DataGrid.Row>
                                <DataGrid.Heading>Payment Method</DataGrid.Heading>
                                <DataGrid.Data>Check payments</DataGrid.Data>
                            </DataGrid.Row>

                            <DataGrid.Row>
                                <DataGrid.Heading>Total</DataGrid.Heading>
                                <DataGrid.Data width={150}>1245 tk</DataGrid.Data>
                            </DataGrid.Row>

                        </DataGrid.Body>
                    </DataGrid.Container>
                </DataGrid.Wrapper>

                <div className="billing-address">
                    <h1>Billing Address</h1>
                    <p className={"address"}>Sabuj ahmed <br/>
                        edorpon Software Company<br/>
                        House#735, Road#11, Avenue#4, <br/>Mirpur DOHS, Dhaka, Bangladesh<br/>
                        +8801888015000<br/>
                        ahmedsabuj515@gmail.com</p>
                </div>

            </div>
        </Fragment>
    );
};

export { OrderDetailsScreen };
