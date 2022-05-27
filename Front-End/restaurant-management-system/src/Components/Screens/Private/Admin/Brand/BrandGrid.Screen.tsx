import React, { Fragment, ReactElement } from 'react';
import {IBrand} from "@/App/Interfaces/Models";
import {IBrandViewState} from "@/Views/Private/Admin/Brand/Brand.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Badge} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {convertToString} from "@/App/Functions/Custom";
import {Image} from "@/Components/Core/Image";

interface IBrandGridScreenProps {
    open?: boolean,

    onView(data: IBrand): any

    gridData: IBrandViewState['grid'],
    formData: IBrandViewState['form'],

    onEdit(item: IBrand): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IBrandViewState)['grid']['filter']]?: (IBrandViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IBrandViewState)['grid']]?: (IBrandViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const BrandGridScreen: React.FC<IBrandGridScreenProps> = (props): ReactElement => {
    const {filter, units } = props.gridData;
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
                            <DataGrid.Heading>Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {units.length > 0 && units.map((item: IBrand, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>

                                <DataGrid.Data>
                                    {convertToString(item.logo_uri) !== "" && (
                                        <Image src={cdn(item.logo_uri)} alt=""/>
                                    )}
                                </DataGrid.Data>
                                <DataGrid.Data>{item.name}</DataGrid.Data>
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

export { BrandGridScreen };
