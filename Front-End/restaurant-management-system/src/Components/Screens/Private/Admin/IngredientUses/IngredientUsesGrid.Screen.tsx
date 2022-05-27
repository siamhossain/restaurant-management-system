import React, { Fragment, ReactElement } from 'react';
import {IIngredient, IIngredientUses} from "@/App/Interfaces/Models";
import {IIngredientUsesViewState} from "@/Views/Private/Admin/IngredientUses/IngredientUses.View";
import {DataGrid} from "@/Components/Core/DataGrid";
import {convertToString} from "@/App/Functions/Custom";
import {Image} from "@/Components/Core/Image";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Badge} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IIngredientUsesGridScreenProps {
    open?: boolean,

    onView(data: IIngredientUses): any

    gridData: IIngredientUsesViewState['grid'],
    formData: IIngredientUsesViewState['form'],

    onEdit(item: IIngredientUses): void,

    onDelete(uuid: string): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IIngredientUsesViewState)['grid']['filter']]?: (IIngredientUsesViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IIngredientUsesViewState)['grid']]?: (IIngredientUsesViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const IngredientUsesGridScreen: React.FC<IIngredientUsesGridScreenProps> = (props): ReactElement => {
    const {filter, ingredients } = props.gridData;

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
                            <DataGrid.Heading>Ingredient Name</DataGrid.Heading>
                            <DataGrid.Heading>Unit</DataGrid.Heading>
                            <DataGrid.Heading>Quantity</DataGrid.Heading>
                            <DataGrid.Heading>Date</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {ingredients.length > 0 && ingredients.map((item: IIngredientUses, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>
                                <DataGrid.Data>{item.ingredient?.title}</DataGrid.Data>
                                <DataGrid.Data>{item.ingredient?.unit?.name}</DataGrid.Data>
                                <DataGrid.Data>{item.quantity}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>

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

export { IngredientUsesGridScreen };
