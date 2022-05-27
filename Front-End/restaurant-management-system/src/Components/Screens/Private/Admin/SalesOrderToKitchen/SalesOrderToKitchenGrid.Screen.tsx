import React, { Fragment, ReactElement } from 'react';
import {ISalesOrder} from "@/App/Interfaces/Models";
import {ISalesOrderToKitchenViewState} from "@/Views/Private/Admin/SalesOrderToKitchen/SalesOrderToKitchen.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import {EyeOpenIcon} from "evergreen-ui";

interface ISalesOrderToKitchenGridScreenProps {
    gridData: ISalesOrderToKitchenViewState['grid'],
    onView(data: ISalesOrder): any
    onReload(): void,
    onStatusUpdate(status: ISalesOrder['status'], uuid: ISalesOrder['uuid']): void,
    onNavigateToPageNumber(): void,
    onChangeFilter(state: { [k in keyof (ISalesOrderToKitchenViewState)['grid']['filter']]?: (ISalesOrderToKitchenViewState)['grid']['filter'][k] }): void,
    onChangeGridData(state: { [k in keyof (ISalesOrderToKitchenViewState)['grid']]?: (ISalesOrderToKitchenViewState)['grid'][k] }): void,
    onNavigateToFirstPage(): void,
    onNavigateToPrevPage(): void,
    onNavigateToNextPage(): void,
    onNavigateToLastPage(): void,
    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
    onFormClose(): void,
}
const SalesOrderToKitchenGridScreen: React.FC<ISalesOrderToKitchenGridScreenProps> = (props): ReactElement => {
    const {filter, sales_list} = props.gridData
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
                            <DataGrid.Heading >Customer Name</DataGrid.Heading>
                            <DataGrid.Heading >Date</DataGrid.Heading>
                            <DataGrid.Heading >Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Show Food</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>
                    <DataGrid.Body>
                        {sales_list.length > 0 && sales_list.map((item: ISalesOrder, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{i + 1}</DataGrid.Data>
                                <DataGrid.Data>{item.customer.name}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                <DataGrid.Data>
                                    {item.status}
                                </DataGrid.Data>
                                <DataGrid.Data align={"center"} width={150}>
                                    <DataGrid.DataActionButton onClick={() => props.onView(item)} icon={<EyeOpenIcon/>}
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

export { SalesOrderToKitchenGridScreen };
