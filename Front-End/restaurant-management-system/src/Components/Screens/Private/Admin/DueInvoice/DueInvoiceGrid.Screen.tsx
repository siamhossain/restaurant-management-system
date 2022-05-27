import React, { Fragment, ReactElement } from 'react';
import {IDueInvoice} from "@/App/Interfaces/Models";
import {DataGrid} from "@/Components/Core/DataGrid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {IDueInvoiceViewState} from "@/Views/Private/Admin/DueInvoice/DueInvoice.View";
import {SelectChangeEvent} from "@/App/Types/Core/SelectChangeEvent.Type";
import {css} from "@emotion/css";

const css_participant_type_picker = css`
  width: 130px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  color: #bebdbd;
  outline: 0;
`;

interface IDueInvoiceGridScreenProps {
    open?: boolean,

    onView(data: IDueInvoice): any

    gridData: IDueInvoiceViewState['grid'],
    formData: IDueInvoiceViewState['form'],

    onEdit(item: IDueInvoice): void,

    onDelete(uuid: IDueInvoice['uuid']): void,

    onReload(): void,

    onNavigateToPageNumber(): void,

    onChangeFilter(state: { [k in keyof (IDueInvoiceViewState)['grid']['filter']]?: (IDueInvoiceViewState)['grid']['filter'][k] }, callback?: undefined | (() => void)): void,

    onChangeGridData(state: { [k in keyof (IDueInvoiceViewState)['grid']]?: (IDueInvoiceViewState)['grid'][k] }): void,

    onFormClose(): void,

    onNavigateToFirstPage(): void,

    onNavigateToPrevPage(): void,

    onNavigateToNextPage(): void,

    onNavigateToLastPage(): void,

    pageNavigationDisabled: () => { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean }
}
const DueInvoiceGridScreen: React.FC<IDueInvoiceGridScreenProps> = (props): ReactElement => {
    const {filter, due_invoice } = props.gridData;
    return (
        <Fragment>
            <DataGrid.Wrapper>
                <DataGrid.FilterBody>
                    <div>
                        <select className={css_participant_type_picker}
                                onChange={(e: SelectChangeEvent) => props.onChangeFilter({
                                    participant_type: (e.target.value as any),
                                }, props.onReload)}>
                            <option value={""}>All</option>
                            <option value={"Customer"} style={{color: "#000000"}}>Customer</option>
                            <option value={"Supplier"} style={{color: "#000000"}}>Supplier</option>
                        </select>
                        <DataGrid.Search
                            value={filter.search}
                            onChange={(e => props.onChangeFilter({search: e.target.value}))}
                            onKeyDown={(e => {
                                if (e.keyCode === 13) {
                                    props.onReload();
                                }
                            })}
                        />
                    </div>
                </DataGrid.FilterBody>
                <DataGrid.Container>
                    <DataGrid.Header>
                        <DataGrid.Row>
                            <DataGrid.Heading>Code</DataGrid.Heading>
                            <DataGrid.Heading>Date</DataGrid.Heading>
                            <DataGrid.Heading>Name</DataGrid.Heading>
                            <DataGrid.Heading>Type</DataGrid.Heading>
                            <DataGrid.Heading>Amount</DataGrid.Heading>
                            <DataGrid.Heading>Comment</DataGrid.Heading>
                            <DataGrid.Heading align={"center"}>Action</DataGrid.Heading>
                        </DataGrid.Row>
                    </DataGrid.Header>

                    <DataGrid.Body>
                        {due_invoice.length > 0 && due_invoice.map((item: IDueInvoice, i: number) => (
                            <DataGrid.Row key={i}>
                                <DataGrid.Data>{item.code}</DataGrid.Data>
                                <DataGrid.Data>{item.date}</DataGrid.Data>
                                {item.participant_type === 'Customer' ? (
                                    <DataGrid.Data>{item.customer?.name}</DataGrid.Data>
                                ) : (
                                    <DataGrid.Data>{item.supplier?.full_name}</DataGrid.Data>
                                )}
                                <DataGrid.Data>{item.participant_type}</DataGrid.Data>
                                <DataGrid.Data>{item.amount}</DataGrid.Data>
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

export { DueInvoiceGridScreen };
