import React, { Fragment, ReactElement } from 'react';
import {IWastage} from "@/App/Interfaces/Models";
import {IWastageViewState} from "@/Views/Private/Admin/Wastage/Wastage.View";
import { DataGrid } from '@/Components/Core/DataGrid';
import {convertToNumber} from "@/App/Functions/Custom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IWastageGridScreenProps {
    open?: boolean,

    onView(data: IWastage): any

    gridData: IWastageViewState['grid'],
    formData: IWastageViewState['form'],

    onEdit(item: IWastage): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IWastageViewState)['grid']['filter']]?: (IWastageViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IWastageViewState)['grid']]?: (IWastageViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const WastageGridScreen: React.FC<IWastageGridScreenProps> = (props): ReactElement => {
    const {filter, wastages} = props.gridData;
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
                            <DataGrid.Heading width={300}>Code</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Date</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Total</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {wastages.length > 0 && wastages.map((item: IWastage, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                <DataGrid.Data>{convertToNumber(item.total_amount).toFixed(2)}</DataGrid.Data>
                                <DataGrid.Data align={"center"} width={150}>
                                    <DataGrid.DataActionButton onClick={() => props.onView(item)}
                                                               icon={<VisibilityIcon/>}
                                    />
                                    <DataGrid.DataActionButton
                                        onClick={() => props.onEdit(item)}
                                        icon={<EditIcon/>}
                                    />
                                    <DataGrid.DataActionButton onClick={() => props.onDelete(item.uuid)}
                                                               icon={<DeleteIcon/>} mode={"danger"}
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


export { WastageGridScreen };
