import React, { Fragment, ReactElement } from 'react';
import {IAccountHead, IAccountingHistory} from "@/App/Interfaces/Models";
import {IAccountingHistoryViewState} from "@/Views/Private/Admin/AccountingHistory/AccountingHistory.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IAccountingHistoryGridScreenProps {
    open?: boolean,

    onView(data: IAccountingHistory): any

    gridData: IAccountingHistoryViewState['grid'],
    formData: IAccountingHistoryViewState['form'],

    onEdit(item: IAccountingHistory): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IAccountingHistoryViewState)['grid']['filter']]?: (IAccountingHistoryViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IAccountingHistoryViewState)['grid']]?: (IAccountingHistoryViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const AccountingHistoryGridScreen: React.FC<IAccountingHistoryGridScreenProps> = (props): ReactElement => {
    const {filter, accounting_histories } = props.gridData;
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
                            <DataGrid.Heading>Head Name</DataGrid.Heading>
                            <DataGrid.Heading>Category Name</DataGrid.Heading>
                            <DataGrid.Heading>Date</DataGrid.Heading>
                            <DataGrid.Heading>Type</DataGrid.Heading>
                            <DataGrid.Heading>Amount</DataGrid.Heading>
                            <DataGrid.Heading>Comment</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {accounting_histories.length > 0 && accounting_histories.map((item: IAccountingHistory, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>


                                <DataGrid.Data>{item.account_head_name}</DataGrid.Data>
                                <DataGrid.Data>{item.account_category_name}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                <DataGrid.Data>{item.type}</DataGrid.Data>
                                <DataGrid.Data>{item.total_amount}</DataGrid.Data>
                                <DataGrid.Data>{item.comment}</DataGrid.Data>

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

export { AccountingHistoryGridScreen };
