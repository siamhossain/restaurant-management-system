import React, { Fragment, ReactElement } from 'react';
import {IUser} from "@/App/Interfaces/Models";
import {DataGrid} from "@/Components/Core/DataGrid";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Badge} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {IUserViewState} from "@/Views/Private/Admin/User/User.View";

interface IUserGridScreenProps {
    open?: boolean,

    onView(data: IUser): any

    gridData: IUserViewState['grid'],
    formData: IUserViewState['form'],

    onEdit(item: IUser): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IUserViewState)['grid']['filter']]?: (IUserViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IUserViewState)['grid']]?: (IUserViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const UserGridScreen: React.FC<IUserGridScreenProps> = (props): ReactElement => {
    const {filter, users} = props.gridData;

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
                            <DataGrid.Heading width={300}>Name</DataGrid.Heading>
                            <DataGrid.Heading>Phone</DataGrid.Heading>
                            <DataGrid.Heading>Email</DataGrid.Heading>
                            <DataGrid.Heading>Address</DataGrid.Heading>
                            <DataGrid.Heading>Role</DataGrid.Heading>
                            <DataGrid.Heading>Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {users.length > 0 && users.map((item: IUser, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>

                                <DataGrid.Data>{item.name}</DataGrid.Data>
                                <DataGrid.Data>{item.phone}</DataGrid.Data>
                                <DataGrid.Data>{item.email}</DataGrid.Data>
                                <DataGrid.Data>{item.address}</DataGrid.Data>
                                <DataGrid.Data>{item.role !== null ? item.role?.title : ""}</DataGrid.Data>
                                <DataGrid.Data>
                                    <Badge color={item.status === "Active" ? "green" : item.status === "Inactive" ? "blue" : "red"}>
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
                        style={{color: 'white'}}
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

export { UserGridScreen };
