import React, { Fragment, ReactElement } from 'react';
import {DataGrid} from "@/Components/Core/DataGrid";
import {ISupplier} from "@/App/Interfaces/Models";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Badge} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {ISupplierViewState} from "@/Views/Private/Admin/Supplier/Supplier.View";

interface ISupplierGridScreenProps {
    open?: boolean,

    onView(data: ISupplier): any

    gridData: ISupplierViewState['grid'],
    formData: ISupplierViewState['form'],

    onEdit(item: ISupplier): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (ISupplierViewState)['grid']['filter']]?: (ISupplierViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (ISupplierViewState)['grid']]?: (ISupplierViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const SupplierGridScreen: React.FC<ISupplierGridScreenProps> = (props): ReactElement => {
    const {filter, suppliers} = props.gridData;
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
                            <DataGrid.Heading>Image</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Name</DataGrid.Heading>
                            <DataGrid.Heading>Phone</DataGrid.Heading>
                            <DataGrid.Heading>Email</DataGrid.Heading>
                            <DataGrid.Heading>Address</DataGrid.Heading>
                            <DataGrid.Heading>Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {suppliers.length > 0 && suppliers.map((item: ISupplier, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>

                                <DataGrid.Data>
                                    <img src={cdn(item.profile_image_uri)} alt=""/>
                                </DataGrid.Data>
                                <DataGrid.Data>{item.full_name}</DataGrid.Data>
                                <DataGrid.Data>{item.phone_number}</DataGrid.Data>
                                <DataGrid.Data>{item.email}</DataGrid.Data>
                                <DataGrid.Data>{item.address}</DataGrid.Data>
                                <DataGrid.Data>
                                    <Badge color={item.status === "Active" ? "green" : item.status === "Pending" ? "blue" : "red"}>
                                        {item.status}
                                    </Badge>
                                </DataGrid.Data>
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

export { SupplierGridScreen };
