import React, {Fragment, ReactElement} from 'react';
import {DataGrid} from "@/Components/Core/DataGrid";
import {IProduct} from "@/App/Interfaces/Models";
import {convertToString} from "@/App/Functions/Custom";
import {Image} from "@/Components/Core/Image";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Badge} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {IProductViewState} from "@/Views/Private/Admin/Product/Product.View";

interface IProductGridScreenProps {
    open?: boolean,

    onView(data: IProduct): any

    gridData: IProductViewState['grid'],
    formData: IProductViewState['form'],

    onEdit(item: IProduct): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IProductViewState)['grid']['filter']]?: (IProductViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IProductViewState)['grid']]?: (IProductViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}

const ProductGridScreen: React.FC<IProductGridScreenProps> = (props): ReactElement => {
    const {filter, products} = props.gridData;
    return (
        <Fragment>
            <DataGrid.Wrapper>
                <DataGrid.FilterBody>
                    <DataGrid.Search
                        value={filter.search}
                        onChange={(e: any) => props.onChangeFilter({search: e.target.value})}
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
                            <DataGrid.Heading>Name</DataGrid.Heading>
                            <DataGrid.Heading>Category Name</DataGrid.Heading>
                            <DataGrid.Heading>Brand Name</DataGrid.Heading>
                            <DataGrid.Heading>Unit Name</DataGrid.Heading>
                            <DataGrid.Heading>Sales Price</DataGrid.Heading>
                            <DataGrid.Heading>Purchase Price</DataGrid.Heading>
                            <DataGrid.Heading>Stock</DataGrid.Heading>
                            <DataGrid.Heading>Status</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {products.length > 0 && products.map((item: IProduct, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>

                                <DataGrid.Data>
                                    {convertToString(item.featured_image_uri) !== "" && (
                                        <Image src={cdn(item.featured_image_uri)} alt=""/>
                                    )}
                                </DataGrid.Data>
                                <DataGrid.Data>{item.title}</DataGrid.Data>
                                <DataGrid.Data>{item.category !== null ? item.category?.name : ''}</DataGrid.Data>
                                <DataGrid.Data>{item.brand !== null ? item.brand?.name : ''}</DataGrid.Data>
                                <DataGrid.Data>{item.unit !== null ? item.unit?.name : ''}</DataGrid.Data>
                                <DataGrid.Data>{item.sales_price}</DataGrid.Data>
                                <DataGrid.Data>{item.purchase_price}</DataGrid.Data>
                                <DataGrid.Data>{item.total_stock}</DataGrid.Data>
                                <DataGrid.Data>
                                    <Badge
                                        color={item.status === "Active" ? "green" : item.status === "Inactive" ? "blue" : "red"}>
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

export {ProductGridScreen};
