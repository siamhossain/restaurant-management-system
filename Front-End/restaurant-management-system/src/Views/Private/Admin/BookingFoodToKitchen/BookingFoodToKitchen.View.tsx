import React, {Fragment, ReactElement} from 'react';
import {IBookingFoodList, IProduct, ITableBooking} from "@/App/Interfaces/Models";
import View from "@/Components/Base/View";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {
    BookingFoodToKitchenGridScreen,
    BookingFoodToKitchenViewScreen
} from "@/Components/Screens/Private/Admin/BookingFoodToKitchen";
import {BookingFoodToKitchenProvider, TableBookingProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";

export interface IBookingFoodToKitchenViewProps {

}

export interface IBookingFoodToKitchenViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        booking_list: ITableBooking[],
        filter: {
            search: string,
        },
    },
    form: {},

    view: {
        data: Partial<ITableBooking>,
        open: boolean,
    }
}

class BookingFoodToKitchenView extends View<IBookingFoodToKitchenViewProps, IBookingFoodToKitchenViewState> {
    constructor(props: React.FC<IBookingFoodToKitchenViewProps>) {
        super(props);
        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 0,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                booking_list: [],
                filter: {
                    search: "",
                },
            },

            form: {},

            view: {
                data: {},
                open: false,
            },

            additional: {}
        }
        this.state = this.initialState;

        this.foodStatusUpdate = this.foodStatusUpdate.bind(this);
    }

    private getTableBookings(): void {
        BookingFoodToKitchenProvider.getTableBookingsForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                )
                this.setGridState({booking_list: data.ListData});

            });
    }

    private bookingStatusChange(status: ITableBooking['status'], uuid: ITableBooking['uuid']) {
        const formData = {
            uuid,
            status
        }
        TableBookingProvider.statusUpdate(formData, (data) => {
            // console.log({data});
            toaster.success(data.message);
            this.getTableBookings();
        });
    }

    private foodStatusUpdate(uuid: IBookingFoodList['uuid'], status: IBookingFoodList['status']): void {
        BookingFoodToKitchenProvider.foodStatusUpdate(uuid, status, (data) => {
            toaster.success("Food Ready to serve!");
            this.getTableBookings();

;        });
    }

    componentDidMount(): void {
        this.getTableBookings();
    }


    render(): ReactElement {
        return (
            <Fragment>
                <MainLayout>
                    <SideBarScreen/>
                    <div className="wrapper" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <HeaderScreen/>
                        <div className={MainContainerStyleSheet.classes.root}>
                            <div className={"main-container"} style={{paddingTop: '10px'}}>
                                <ModuleTitleScreen
                                    moduleTitle={"Table Order  List"}

                                />

                                <BookingFoodToKitchenGridScreen
                                    gridData={this.state.grid}
                                    onReload={this.getTableBookings}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}

                                    onChangeGridData={this.setGridState}
                                    onChangeFilter={this.setGridFilterState}
                                    onNavigateToPageNumber={this.paginateController}
                                    onNavigateToFirstPage={this.navigateToFirstPage}
                                    onNavigateToPrevPage={this.navigateToPrevPage}
                                    onNavigateToNextPage={this.navigateToNextPage}
                                    onNavigateToLastPage={this.navigateToLastPage}
                                    pageNavigationDisabled={this.pageNavigationDisabled}
                                    onFormClose={this.resetFormState}
                                    onStatusUpdate={this.bookingStatusChange}
                                />

                                <BookingFoodToKitchenViewScreen
                                    viewData={this.state.view}
                                    onViewClose={this.resetViewState}
                                    foodStatusUpdate={this.foodStatusUpdate}
                                    onReload={this.getTableBookings}
                                />

                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default BookingFoodToKitchenView;
