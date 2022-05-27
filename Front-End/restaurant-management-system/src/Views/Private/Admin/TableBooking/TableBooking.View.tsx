import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {IBookingFoodList, ICategory, IProduct, ITableBooking} from "@/App/Interfaces/Models";
import {
    TableBookingFormScreen,
    TableBookingGridScreen,
    TableBookingViewScreen
} from "@/Components/Screens/Private/Admin/TableBooking";
import {convertToNumber, convertToString} from "@/App/Functions/Custom";
import {
    CustomerProvider,
    ProductProvider,
    SocialLinkProvider,
    TableBookingProvider
} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {parseDate} from "@/App/Functions/Custom/parseDate.Function";
import {SocialLinkGridScreen} from "@/Components/Screens/Private/Admin/SocialLink";
import {SelectChangeEvent} from "@/App/Types/Core/SelectChangeEvent.Type";
import {any} from "prop-types";

export interface ITableBookingViewProps {

}

export interface ITableBookingViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        table_booking: ITableBooking[],
        foods: IProduct[],
        filter: {
            search: string,
        },
    },
    form: {

        open: boolean,
        uuid: string,
        name: Partial<ITableBooking['name']>,
        email: Partial<ITableBooking['email']>,
        phone: Partial<ITableBooking['phone']>,
        date: Partial<ITableBooking['date']>,
        time: Partial<ITableBooking['time']>,
        customer_uuid: Partial<ITableBooking['customer_uuid']>,
        person: Partial<ITableBooking['person']>,
        occasion: Partial<ITableBooking['occasion']>,
        status: Partial<ITableBooking['status']>,
        message: Partial<ITableBooking['message']>,
        food_category_uuid: Partial<IBookingFoodList['food_category_uuid']>,
        food_uuid: Partial<IBookingFoodList['food_uuid']>,
        food_name: Partial<IBookingFoodList['food_name']>,
        category_name: Partial<IBookingFoodList['category_name']>,
        price: Partial<IBookingFoodList['price']>,
        total_price: Partial<IBookingFoodList['total_price']>,
        quantity: Partial<IBookingFoodList['quantity']>,
        is_uploading: boolean,
        booking_food_list: Partial<IBookingFoodList>[] | IBookingFoodList[],
    },

    view: {
        data: Partial<ITableBooking>,
        open: boolean,
    }
}
class TableBookingView extends View<ITableBookingViewProps, ITableBookingViewState> {
    constructor(props: ITableBookingViewProps) {
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

                table_booking: [],
                foods: [],
                filter: {
                    search: "",
                },
            },

            form: {
                open: false,
                uuid: '',
                name: '',
                customer_uuid: '',
                date: parseDate(new Date()),
                email: '',
                is_uploading: false,
                message: '',
                occasion: 'Other',
                person: 0,
                phone: '',
                status: 'Placed',
                time: '',
                food_category_uuid: '',
                food_uuid: '',
                category_name: '',
                food_name: '',
                price: 0,
                total_price: 0,
                quantity: 0,
                booking_food_list: [],

            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        }

        this.state = this.initialState;

        this.saveTableBooking = this.saveTableBooking.bind(this);
        this.bookingStatusChange = this.bookingStatusChange.bind(this);
        this.getTableBookings = this.getTableBookings.bind(this);
        this.getFoods = this.getFoods.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.addParticular = this.addParticular.bind(this);
        this.getProductTitle = this.getProductTitle.bind(this);
        this.changeParticularData = this.changeParticularData.bind(this);
        this.deleteParticular = this.deleteParticular.bind(this);
        this.getCustomerInfoByUuId = this.getCustomerInfoByUuId.bind(this);
    }

    private getTableBookings(): void {
        TableBookingProvider.getTableBookingsForGrid(
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
                this.setGridState({table_booking: data.ListData});
            });
    }

    private saveTableBooking(): void {

        if (this.state.form.name === '') {
            toaster.danger("Name Can not be empty!");
            return;
        }

        TableBookingProvider.saveTableBooking(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getTableBookings();

        });

    }

    private getCustomerInfoByUuId(uuid: string) {
        CustomerProvider.getCustomerInfoByUuId(uuid, (data) => {
            this.setFormState({
                name: convertToString(data.name),
                email: convertToString(data.email),
                phone: convertToString(data.phone_number),
            })
        })
    }

    private getFoods(cate_uuid: ICategory['uuid']): void {
        ProductProvider.getProductsNoLimit(cate_uuid, (data) => {
            this.setGridState({
                foods: data,
            });
        })
    }

    private handleOnChange(value: any) {
        //console.log(value);
        this.setFormState({food_uuid: value})
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

    private getProductTitle(uuid: IProduct['uuid']): void {
        ProductProvider.getProductTitle(uuid, (data: IProduct) => {
            this.setFormState({
                food_name: data.title,
                price: data.sales_price,
            })
        })
    }

    private addParticular(): void {
        const data = this.state.form;
        const booking_food_list = [...this.state.form.booking_food_list];

        if (data.food_category_uuid === "") {
            toaster.danger("Please Select Category");
            return;
        }

        if (data.food_uuid === "") {
            toaster.danger("Please Select Category");
            return;
        }
        if (data.quantity === 0) {
            toaster.danger("Please enter quantity");
            return;
        }

        // we check the existence of the variant option
        const combination_index = booking_food_list.findIndex(p => convertToString(p.food_uuid) === convertToString(data.food_uuid));

        if(combination_index > -1) {
            toaster.danger("Please select a different food!");
            return;
        }


        booking_food_list.push({
            food_category_uuid: data.food_category_uuid,
            food_uuid: data.food_uuid,
            category_name: data.category_name,
            food_name: data.food_name,
            price: data.price,
            quantity: data.quantity,
            total_price: Number(data.price) * Number(data.quantity),
        });


        this.setFormState({
            booking_food_list,
            food_name: '',
            food_uuid: '',
            food_category_uuid: '',
            category_name: '',
            price: 0,
            quantity: 0,
            total_price: 0,

        });
    }

    private changeParticularData(data: {
        index: number,
        key: 'quantity',
        value: never,
    }, callback: (() => void) | undefined = undefined): void {

        const booking_food_list = [...this.state.form.booking_food_list];
        booking_food_list[data.index][data.key] = data.value;

        this.setFormState({
            booking_food_list,
        }, () => {
            if (callback) {
                callback()
            }

        });
    }

    private deleteParticular(index: number): void {
        const booking_food_list = [...this.state.form.booking_food_list];
        booking_food_list.splice(index, 1);
        this.setFormState({booking_food_list});
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
                                    moduleTitle={"Booking List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <TableBookingGridScreen
                                    formData={this.state.form}
                                    gridData={this.state.grid}
                                    onReload={this.getTableBookings}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}

                                    onEdit={(item) => {
                                        this.setFormState({
                                            open: true,
                                            name: item.name,
                                            uuid: item.uuid,
                                            phone: item.phone,
                                            email: item.email,
                                            customer_uuid: item.customer_uuid,
                                            message: item.message,
                                            person: item.person,
                                            time: item.time,
                                            status: item.status,
                                            occasion: item.occasion,
                                            date: item.date,
                                            booking_food_list: item.booking_food_list,
                                        });
                                    }}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            TableBookingProvider.deleteTableBooking(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getTableBookings();
                                            })
                                        }
                                    }}
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
                                <TableBookingFormScreen
                                    formData={this.state.form}
                                    onFormStateChange={this.setFormState}
                                    onFormClose={this.resetFormState}
                                    onFormSubmit={this.saveTableBooking}
                                    getCustomerInfo={this.getCustomerInfoByUuId}
                                    foods={this.getFoods}
                                    handleOnChange={this.handleOnChange}
                                    addFood={this.addParticular}
                                    getProductInfo={this.getProductTitle}
                                    gridData={this.state.grid}
                                    onChangeParticularData={this.changeParticularData}
                                    removeParticular={this.deleteParticular}
                                />

                                <TableBookingViewScreen
                                    viewData={this.state.view}
                                    onViewClose={this.resetViewState}
                                />
                            </div>
                        </div>

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default TableBookingView;
