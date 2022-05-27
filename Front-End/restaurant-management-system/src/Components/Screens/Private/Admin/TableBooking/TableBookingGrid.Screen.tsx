import React, { Fragment, ReactElement } from 'react';
import {ITableBooking} from "@/App/Interfaces/Models";
import {ITableBookingViewState} from "@/Views/Private/Admin/TableBooking/TableBooking.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import {EditIcon, EyeOpenIcon, Badge, TrashIcon, Select} from "evergreen-ui";
import {Grid} from "@material-ui/core";

interface ITableBookingGridScreenProps {
    gridData: ITableBookingViewState['grid'],
    formData: ITableBookingViewState['form'],
    onView(data: ITableBooking): any
    onReload(): void,
    onEdit(item: ITableBooking): void,
    onStatusUpdate(status: ITableBooking['status'], uuid: ITableBooking['uuid']): void,
    onDelete(uuid: string): void
    onNavigateToPageNumber(): void,
    onChangeFilter(state: { [k in keyof (ITableBookingViewState)['grid']['filter']]?: (ITableBookingViewState)['grid']['filter'][k] }): void,
    onChangeGridData(state: { [k in keyof (ITableBookingViewState)['grid']]?: (ITableBookingViewState)['grid'][k] }): void,
    onNavigateToFirstPage(): void,
    onNavigateToPrevPage(): void,
    onNavigateToNextPage(): void,
    onNavigateToLastPage(): void,
    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
    onFormClose(): void,
}
const TableBookingGridScreen: React.FC<ITableBookingGridScreenProps> = (props): ReactElement => {
    const {filter, table_booking} = props.gridData
    return (
        <Fragment>
            <DataGrid.Wrapper>
                <DataGrid.FilterBody>
                    <DataGrid.Search
                        value={filter.search}
                        onChange={(e => props.onChangeFilter({search: e.target.value}))}
                        onKeyDown={(e => {
                            if (e.keyCode === 13) {
                                props.onReload();
                            }
                        })}
                    />
                </DataGrid.FilterBody>
                <DataGrid.Container>
                    <DataGrid.Header>
                        <DataGrid.Row>
                            <DataGrid.Heading >SL.</DataGrid.Heading>
                            <DataGrid.Heading >Name</DataGrid.Heading>
                            <DataGrid.Heading >Phone</DataGrid.Heading>
                            <DataGrid.Heading >Date</DataGrid.Heading>
                            <DataGrid.Heading >Time</DataGrid.Heading>
                            <DataGrid.Heading >Person</DataGrid.Heading>
                            <DataGrid.Heading >Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>
                    <DataGrid.Body>
                        {table_booking.length > 0 && table_booking.map((item: ITableBooking, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{i + 1}</DataGrid.Data>
                                <DataGrid.Data>{item.name}</DataGrid.Data>
                                <DataGrid.Data>{item.phone}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                <DataGrid.Data>{item.time}</DataGrid.Data>
                                <DataGrid.Data>{item.person}</DataGrid.Data>
                                <DataGrid.Data>
                                    <Select
                                        value={item.status}
                                        onChange={(event: any) => props.onStatusUpdate(event.target.value, item.uuid)}

                                    >
                                        <option value="Placed">Placed</option>
                                        <option value="Accept">Accept</option>
                                        <option value="Cancel">Cancel</option>
                                    </Select>

                                </DataGrid.Data>
                                <DataGrid.Data align={"center"} width={150}>
                                    <DataGrid.DataActionButton onClick={() => props.onView(item)} icon={<EyeOpenIcon/>}
                                    />
                                    <DataGrid.DataActionButton
                                        onClick={() => props.onEdit(item)}
                                        icon={<EditIcon/>}
                                    />
                                    <DataGrid.DataActionButton onClick={() => props.onDelete(item.uuid)}
                                                               icon={<TrashIcon/>} mode={"danger"}
                                    />
                                </DataGrid.Data>
                            </DataGrid.Row>
                        ))}

                    </DataGrid.Body>
                </DataGrid.Container>

                <DataGrid.FooterBody>
                    <DataGrid.GridPagination
                        pageLimit={props.gridData.rows_per_page}
                        onChangePageLimit={(limit) => {
                            props.onChangeGridData({
                                rows_per_page: limit,
                            });
                            setTimeout(() => {
                                props.onNavigateToPageNumber();
                            }, 200);
                        }}
                        pageNumber={props.gridData.current_page}
                        totalPages={props.gridData.total_pages}
                        onChangePageNumber={(page_number) => props.onChangeGridData({
                            current_page: page_number,
                        })}
                        onNavigateToPageNumber={props.onNavigateToPageNumber}
                        onNavigateToFirstPage={props.onNavigateToFirstPage}
                        onNavigateToPrevPage={props.onNavigateToPrevPage}
                        onNavigateToNextPage={props.onNavigateToNextPage}
                        onNavigateToLastPage={props.onNavigateToLastPage}

                        firstPageDisabled={props.pageNavigationDisabled().firstPage}
                        prevPageDisabled={props.pageNavigationDisabled().prevPage}
                        nextPageDisabled={props.pageNavigationDisabled().nextPage}
                        lastPageDisabled={props.pageNavigationDisabled().lastPage}
                    />
                </DataGrid.FooterBody>
            </DataGrid.Wrapper>
        </Fragment>
    );
};

export { TableBookingGridScreen };
