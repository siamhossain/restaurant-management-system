import React, { Fragment, ReactElement } from 'react';
import {IPurchaseOrder, IPurchaseOrderReturn} from "@/App/Interfaces/Models";
import {IPurchaseOrderReturnViewState} from "@/Views/Private/Admin/PurchaseOrderReturn/PurchaseOrderReturn.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import {EditIcon, EyeOpenIcon, TrashIcon} from "evergreen-ui";

interface IPurchaseOrderReturnGridScreenProps {
    gridData: IPurchaseOrderReturnViewState['grid'],
    formData: IPurchaseOrderReturnViewState['form'],
    onView(data: IPurchaseOrderReturn): any
    onReload(): void,
    onEdit(item: IPurchaseOrderReturn): void,
    onDelete(uuid: string): void
    onNavigateToPageNumber(): void,
    onChangeFilter(state: { [k in keyof (IPurchaseOrderReturnViewState)['grid']['filter']]?: (IPurchaseOrderReturnViewState)['grid']['filter'][k] }): void,
    onChangeGridData(state: { [k in keyof (IPurchaseOrderReturnViewState)['grid']]?: (IPurchaseOrderReturnViewState)['grid'][k] }): void,
    onNavigateToFirstPage(): void,
    onNavigateToPrevPage(): void,
    onNavigateToNextPage(): void,
    onNavigateToLastPage(): void,
    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
    onFormClose(): void,
}
const PurchaseOrderReturnGridScreen: React.FC<IPurchaseOrderReturnGridScreenProps> = (props): ReactElement => {
    const {filter, purchase_order_returns} = props.gridData
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
                            <DataGrid.Heading >Code</DataGrid.Heading>
                            <DataGrid.Heading >Supplier</DataGrid.Heading>
                            <DataGrid.Heading >Total Amount</DataGrid.Heading>
                            <DataGrid.Heading >Discount</DataGrid.Heading>
                            <DataGrid.Heading >Payable Amount</DataGrid.Heading>
                            <DataGrid.Heading >Paid Amount</DataGrid.Heading>
                            <DataGrid.Heading >Date</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>
                    <DataGrid.Body>
                        {purchase_order_returns.length > 0 && purchase_order_returns.map((item: IPurchaseOrderReturn, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{i + 1}</DataGrid.Data>
                                <DataGrid.Data>{item.code}</DataGrid.Data>
                                <DataGrid.Data>{item.supplier?.full_name}</DataGrid.Data>
                                <DataGrid.Data>{item.total_amount}</DataGrid.Data>
                                <DataGrid.Data>{item.discount}</DataGrid.Data>
                                <DataGrid.Data>{item.payable_amount}</DataGrid.Data>
                                {item.payment_type === 'Cash' ? (
                                    <DataGrid.Data>{item.received_amount}</DataGrid.Data>
                                ) : (
                                    <DataGrid.Data>{item.paid_amount}</DataGrid.Data>
                                )}
                                <DataGrid.Data>{item.date}</DataGrid.Data>
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

export { PurchaseOrderReturnGridScreen };
