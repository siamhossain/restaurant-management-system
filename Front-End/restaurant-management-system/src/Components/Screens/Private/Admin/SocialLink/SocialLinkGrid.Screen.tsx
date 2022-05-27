import React, { Fragment, ReactElement } from 'react';
import {ISocialLinkViewState} from "@/Views/Private/Admin/SocialLink/SocialLink.View";
import {ISocialLink} from "@/App/Interfaces/Models";
import { DataGrid } from '@/Components/Core/DataGrid';
import {convertToString} from "@/App/Functions/Custom";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {EditIcon, EyeOpenIcon, TrashIcon} from "evergreen-ui";
import {Image} from "@/Components/Core/Image";

interface ISocialLinkGridScreenProps {
    gridData: ISocialLinkViewState['grid'],
    formData: ISocialLinkViewState['form'],
    onView(data: ISocialLink): any
    onReload(): void,
    onEdit(item: ISocialLink): void,
    onDelete(uuid: string): void
    onNavigateToPageNumber(): void,
    onChangeFilter(state: { [k in keyof (ISocialLinkViewState)['grid']['filter']]?: (ISocialLinkViewState)['grid']['filter'][k] }): void,
    onChangeGridData(state: { [k in keyof (ISocialLinkViewState)['grid']]?: (ISocialLinkViewState)['grid'][k] }): void,
    onNavigateToFirstPage(): void,
    onNavigateToPrevPage(): void,
    onNavigateToNextPage(): void,
    onNavigateToLastPage(): void,
    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
    onFormClose(): void,
}
const SocialLinkGridScreen: React.FC<ISocialLinkGridScreenProps> = (props): ReactElement => {
    const {filter, Social_links} = props.gridData
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
                            <DataGrid.Heading width={300}>SL.</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Name</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Icon</DataGrid.Heading>
                            <DataGrid.Heading width={300}>Website URL</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {Social_links.length > 0 && Social_links.map((item: ISocialLink, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{i + 1}</DataGrid.Data>
                                <DataGrid.Data>{item.name}</DataGrid.Data>
                                <DataGrid.Data>
                                    {convertToString(item.icon_uri) !== "" && (
                                        <Image src={cdn(item.icon_uri)}/>
                                    )}
                                </DataGrid.Data>
                                <DataGrid.Data>{item.website_url}</DataGrid.Data>
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

export { SocialLinkGridScreen };
