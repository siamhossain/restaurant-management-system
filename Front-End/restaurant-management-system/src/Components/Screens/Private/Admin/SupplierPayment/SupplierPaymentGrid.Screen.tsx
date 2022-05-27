import React, { Fragment, ReactElement } from 'react';
import {ICustomerPayment, ISupplierPayment} from "@/App/Interfaces/Models";
import {ISupplierPaymentViewState} from "@/Views/Private/Admin/SupplierPayment/SupplierPayment.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface ISupplierPaymentGridScreenProps {
    open?: boolean,

    onView(data: ISupplierPayment): any

    gridData: ISupplierPaymentViewState['grid'],
    formData: ISupplierPaymentViewState['form'],

    onEdit(item: ISupplierPayment): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (ISupplierPaymentViewState)['grid']['filter']]?: (ISupplierPaymentViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (ISupplierPaymentViewState)['grid']]?: (ISupplierPaymentViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const SupplierPaymentGridScreen: React.FC<ISupplierPaymentGridScreenProps> = (props): ReactElement => {
    const {filter, supplier_payments} = props.gridData;


    return (
        <Fragment>
            <DataGrid.Wrapper>
                <DataGrid.FilterBody>
                    <DataGrid.Search
                        value={filter.search}
                        onChange={(e: any )=> props.onChangeFilter({search: e.target.value})}
                        onKeyDown={(e: any) => {
                            if (e.keyCode === 13) {
                                props.onReload();
                            }
                        }}
                    />
                </DataGrid.FilterBody>
                <DataGrid.Container>
                    <DataGrid.Header>
                        <DataGrid.Row>
                            <DataGrid.Heading>Code</DataGrid.Heading>
                            <DataGrid.Heading>Date</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Name</DataGrid.Heading>
                            <DataGrid.Heading>Paid Amount</DataGrid.Heading>
                            <DataGrid.Heading>Reference</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {supplier_payments.length > 0 && supplier_payments.map((item: ISupplierPayment, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>

                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                <DataGrid.Data>{item.supplier.full_name}</DataGrid.Data>
                                <DataGrid.Data>{item.paid_amount}</DataGrid.Data>
                                <DataGrid.Data>{item.reference}</DataGrid.Data>

                                <DataGrid.Data align={"center"}
                                               width={150}>
                                    <DataGrid.DataActionButton onClick={() => props.onView(item)}
                                                               icon={<VisibilityIcon/>}/>
                                    <DataGrid.DataActionButton
                                        onClick={() => props.onEdit(item)}
                                        icon={<EditIcon/>}/>
                                    <DataGrid.DataActionButton onClick={() => props.onDelete(item.uuid)}
                                                               icon={<DeleteIcon/>} mode={"danger"}/>
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


export { SupplierPaymentGridScreen };
