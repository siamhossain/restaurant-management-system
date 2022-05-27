import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {ProductProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {IProduct} from "@/App/Interfaces/Models";
import {toaster} from "evergreen-ui";
import {ProductFormScreen, ProductGridScreen, ProductViewScreen} from "@/Components/Screens/Private/Admin/Product";

export interface IProductViewProps {

}

export interface IProductViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        products: IProduct[],

        filter: {
            search: string,
        },
    },

    form: {
        open: boolean,
        edit_mode: boolean,
        is_uploading: boolean,
        is_slug_suggestions_loading: boolean,
        is_sku_checkpoint_loading: boolean,

        code: IProduct['code'],
        uuid: IProduct['uuid'],
        title: IProduct['title'],
        featured_image_uri: IProduct['featured_image_uri'],
        featured_video_id: IProduct['featured_video_id'],
        barcode: IProduct['barcode'],
        slug: IProduct['slug'],
        min_stock: IProduct['min_stock'],
        sales_price: IProduct['sales_price'],
        purchase_price: IProduct['purchase_price'],
        description: IProduct['description'],
        category_uuid: IProduct['category_uuid'],
        brand_uuid: IProduct['brand_uuid'],
        unit_uuid: IProduct['unit_uuid'],
        vat: IProduct['vat'],
        tax: IProduct['tax'],
        sku: IProduct['sku'],
        total_rating_count: IProduct['total_rating_count'],
        total_review_count: IProduct['total_review_count'],
        status: IProduct['status'],
        slug_exists: boolean,
        slug_suggestions: string[],
        media: string[],
        sku_exists: boolean,

    },

    view: {
        data: Partial<IProduct>,
        open: boolean,
    }
}
class ProductView extends View<IProductViewProps, IProductViewState> {
    constructor(props: IProductViewProps) {
        super(props);

        this.initialState = {
            grid: {
                rows_per_page: 10,
                current_page: 1,
                total_pages: 0,
                prev_page: 0,
                next_page: 0,
                first_page: 0,
                last_page: 0,

                products: [],
                filter: {
                    search: "",
                },
            },

            form: {
                open: false,
                edit_mode: false,
                is_uploading: false,
                is_slug_suggestions_loading: false,
                is_sku_checkpoint_loading: false,
                code: '',
                uuid: '',
                title: '',
                featured_image_uri: '',
                featured_video_id: '',
                barcode: '',
                slug: '',
                description: '',
                category_uuid: '',
                brand_uuid: '',
                unit_uuid: '',
                vat: 0,
                tax: 0,
                total_rating_count: 0,
                total_review_count: 0,
                status: "Active",
                slug_exists: false,
                slug_suggestions: [],
                media: [],
                sku_exists: false,
                sku: '',
                sales_price: 0,
                purchase_price: 0,
                min_stock: 0,

            },

            view: {
                data: {},
                open: false,
            },

            additional: {}
        };

        this.state = this.initialState;

        this.getProducts = this.getProducts.bind(this);
        this.checkSlug = this.checkSlug.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.checkProductSKUExistence = this.checkProductSKUExistence.bind(this);
    }

    public paginateController(): void {
        super.paginateController(this.getProducts);
    }

    private getProducts(): void {
        ProductProvider.getProductsForGrid(
            this.state.grid.rows_per_page,
            this.state.grid.current_page,
            this.state.grid.filter.search,
            (data) => {
                this.setPaginationData(
                    data.TotalPages,
                    data.PrevPage,
                    data.NextPage,
                    data.LastPage,
                );
                this.setGridState({products: data.ListData});
            }
        );
    }

    private checkSlug(): void {
        this.setFormState({
            is_slug_suggestions_loading: true,
        }, () => {
            ProductProvider.checkSlug({
                uuid: this.state.form.uuid,
                slug: this.state.form.slug,
            }, (data) => {
                this.setFormState({
                    slug_exists: data.exists,
                    slug_suggestions: data.suggestions,
                    is_slug_suggestions_loading: false,
                });
            });
        });
    }

    private saveProduct(): void {
        if (this.state.form.title === '') {
            toaster.danger("Product title can not be empty!");
            return;
        }
        if (this.state.form.slug === '') {
            toaster.danger("Slug not be empty!");
            return;
        }
        if (this.state.form.slug_exists) {
            toaster.danger("Please enter a unique slug!");
            return;
        }

        ProductProvider.saveProduct(this.state.form, (data) => {
            toaster.success(data.message);
            this.resetFormState();
            this.getProducts();
        });
    }

    private checkProductSKUExistence(sku: IProduct['sku']): void {
        let uuid = this.state.form.uuid;

        this.setFormState({
            is_sku_checkpoint_loading: true,
        });

        ProductProvider.checkSKU({uuid, sku}, (data) => {
            const sku_exists = convertToBoolean(data.sku_exists);

            this.setFormState({
                sku_exists,
            });


            this.setFormState({
                is_sku_checkpoint_loading: false,
            });
        });
    }

    componentDidMount(): void {
        this.getProducts()
;    }

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
                                    moduleTitle={"Product List"}

                                    actionButtons={[
                                        {
                                            label: "Add New",
                                            buttonProps: {
                                                onClick: () => this.setFormState({open: true}),
                                            }
                                        }
                                    ]}
                                />

                                <ProductGridScreen
                                    gridData={this.state.grid}
                                    formData={this.state.form}
                                    onReload={this.getProducts}
                                    onView={(data) => this.setViewState({
                                        open: true,
                                        data,
                                    })}
                                    onDelete={(uuid) => {
                                        if (window.confirm("Are you sure?")) {
                                            ProductProvider.deleteProduct(uuid, (data) => {
                                                toaster.success(data.message);
                                                this.getProducts();
                                            })
                                        }
                                    }}
                                    onEdit={(item) => {
                                        this.setFormState({
                                            uuid: item.uuid,
                                            open: true,
                                            purchase_price: item.purchase_price,
                                            sales_price: item.sales_price,
                                            sku: item.sku,
                                            media: item.media.map((media: any) => media.product_image_uri),
                                            featured_image_uri: item.featured_image_uri,
                                            featured_video_id: item.featured_video_id,
                                            vat: item.vat,
                                            title: item.title,
                                            barcode: item.barcode,
                                            description: item.description,
                                            unit_uuid: item.unit_uuid,
                                            brand_uuid: item.brand_uuid,
                                            category_uuid: item.category_uuid,
                                            min_stock: item.min_stock,
                                            slug: item.slug,
                                            status: item.status,
                                            tax: item.tax
                                        })
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
                                />
                            </div>
                        </div>

                        <ProductFormScreen
                            onFormClose={this.resetFormState}
                            onFormSubmit={this.saveProduct}
                            onFormStateChange={this.setFormState}
                            formData={this.state.form}
                            gridData={this.state.grid}
                            onFormCloseDataReload={this.getProducts}
                            onSKUExistenceCheck={this.checkProductSKUExistence}
                            onCheckSlug={this.checkSlug}
                        />

                        <ProductViewScreen
                            viewData={this.state.view}
                            onViewClose={this.resetViewState}
                        />

                    </div>

                </MainLayout>
            </Fragment>
        );
    }
}

export default ProductView;
