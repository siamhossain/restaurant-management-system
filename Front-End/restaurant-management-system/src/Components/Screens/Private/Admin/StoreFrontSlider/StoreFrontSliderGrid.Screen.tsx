import React, {Fragment, ReactElement} from 'react';
import {IStoreFrontSliderViewState} from "@/Views/Private/Admin/Slider/StoreFrontSlider.View";
import {IStoreFrontSlider} from "@/App/Interfaces/Models";
import {DataGrid} from '@/Components/Core/DataGrid';
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {Badge, DeleteIcon, EditIcon} from "evergreen-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {convertToNumber} from "@/App/Functions/Custom";

interface IStoreFrontSliderGridScreenProps {
    open?: boolean,
    gridData: IStoreFrontSliderViewState['grid'],
    formData: IStoreFrontSliderViewState['form'],

    onView(data: IStoreFrontSlider): any,

    onReload(): void,

    onEdit(uuid: any, image_uri: any, description: any, description_text_color: any, is_featured: any): void,

    onDelete(uuid: string): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IStoreFrontSliderViewState)['grid']['filter']]?: (IStoreFrontSliderViewState)['grid']['filter'][k] }): void,

    onChangeGridData(state: { [k in keyof (IStoreFrontSliderViewState)['grid']]?: (IStoreFrontSliderViewState)['grid'][k] }): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }

    onFormClose(): void,
}

const StoreFrontSliderGridScreen: React.FC<IStoreFrontSliderGridScreenProps> = (props): ReactElement => {
    const {filter, slides} = props.gridData
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
                            <DataGrid.Heading>SL</DataGrid.Heading>
                            <DataGrid.Heading>Image</DataGrid.Heading>
                            <DataGrid.Heading>Description</DataGrid.Heading>
                            <DataGrid.Heading>Featured</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {slides.length > 0 && slides.map((item: IStoreFrontSlider, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{i + 1}</DataGrid.Data>
                                <DataGrid.Data>
                                    <img src={cdn(item.image_uri)} alt=""/>
                                </DataGrid.Data>
                                <DataGrid.Data>
                                    {item.description}
                                </DataGrid.Data>
                                <DataGrid.Data>
                                    <Badge color={convertToBoolean(item.is_featured) ? "purple" : "teal"}>
                                        {convertToBoolean(item.is_featured) ? "Featured" : "Regular"}
                                    </Badge>
                                </DataGrid.Data>
                                <DataGrid.Data align={"center"} width={150}>
                                    <DataGrid.DataActionButton onClick={() => props.onView(item)}
                                                               icon={<VisibilityIcon/>}/>

                                    <DataGrid.DataActionButton
                                        onClick={() => props.onEdit(item.uuid, item.image_uri, item.description, item.description_text_color, convertToNumber(item.is_featured) === 1)}
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

export {StoreFrontSliderGridScreen};
