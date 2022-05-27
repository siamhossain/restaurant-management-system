import { DataGrid } from '@/Components/Core/DataGrid';
import React, { Fragment, ReactElement } from 'react';

const OrderListScreen = (): ReactElement => {
    return (
        <Fragment>
            <DataGrid.Wrapper>
                <DataGrid.Container>
                    <DataGrid.Header>
                        <DataGrid.Row>
                            <DataGrid.Heading>Order</DataGrid.Heading>
                            <DataGrid.Heading>Date</DataGrid.Heading>
                            <DataGrid.Heading>Status</DataGrid.Heading>
                            <DataGrid.Heading>Total</DataGrid.Heading>
                            <DataGrid.Heading>Actions</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>
                    <DataGrid.Body>
                        <DataGrid.Row>
                            <DataGrid.Data>#5637</DataGrid.Data>
                            <DataGrid.Data width={150}>October 21, 2021</DataGrid.Data>
                            <DataGrid.Data>
                                <DataGrid.Status>Pending</DataGrid.Status>
                            </DataGrid.Data>
                            <DataGrid.Data width={150}>1245 tk For 2 item</DataGrid.Data>
                            <DataGrid.Data>
                                <DataGrid.DataActionButton/>
                            </DataGrid.Data>
                        </DataGrid.Row>
                        <DataGrid.Row>
                            <DataGrid.Data>#5637</DataGrid.Data>
                            <DataGrid.Data width={150}>October 21, 2021</DataGrid.Data>
                            <DataGrid.Data>
                                <DataGrid.Status>Delivered</DataGrid.Status>
                            </DataGrid.Data>
                            <DataGrid.Data width={150}>1245 tk For 2 item</DataGrid.Data>
                            <DataGrid.Data>
                                <DataGrid.DataActionButton/>
                            </DataGrid.Data>
                        </DataGrid.Row>
                    </DataGrid.Body>
                </DataGrid.Container>
            </DataGrid.Wrapper>
        </Fragment>
    );
};

export { OrderListScreen };
