import React, {Fragment, ReactElement} from 'react';
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import View from "@/Components/Base/View";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";
import {parseDate} from "@/App/Functions/Custom";
import {css} from "@emotion/css";
import {Button, Select} from "evergreen-ui";
import {ApiConfig} from "@/App/Config/Api";
import {PurchaseOrderProvider, UserProvider} from "@/App/Services/Providers/Modules/Admin";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainContainerStyleSheet} from "@/Static/StyleSheets/Admin/MainContainer";
import {SupplierDropdownScreen} from "@/Components/Screens/Private/Admin/Supplier/SupplierDropdown.Screen";
import {IngredientPurchaseProvider} from "@/App/Services/Providers/Modules/Admin";

class IngredientPurchaseDetailsView extends View<any, any> {

    constructor(props: any) {
        super(props);

        this.initialState = {
            grid: {
                purchase_order_list: [],
            },
            form: {
                purchase_uuid: '',
            }
        }

        this.state = this.initialState;
        this.getAllOrderList = this.getAllOrderList.bind(this);
    }

    private getAllOrderList() {
        IngredientPurchaseProvider.getIngredientPurchasesNoLimit('', (data) => {
            this.setGridState({purchase_order_list: data});
        })
    }

    componentDidMount(): void {
        this.getAllOrderList();
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
                                    moduleTitle={"Ingredient Purchase Details"}
                                />
                                <Grid container spacing={2} style={{marginLeft: "25px"}}>
                                    <Grid item lg={3}>
                                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Invoice
                                            Select <abbr style={{color: 'red'}}>*</abbr></div>
                                        <Select
                                            width={'100%'}
                                            backgroundColor={"#ffffff"}
                                            borderRadius={'5px'}
                                            onChange={(e) => this.setFormState({purchase_uuid: e.target.value})}
                                            value={this.state.form.purchase_uuid}
                                        >
                                            <option value="">Select Invoice</option>
                                            {this.state.grid.purchase_order_list.map((item: any, index: number) => (
                                                <option key={index} value={item.uuid}>{item.code}</option>
                                            ))}
                                        </Select>
                                    </Grid>

                                    <Grid item lg={3}>
                                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 5}}>
                                            <Button onClick={() => window.open(ApiConfig.REPORTS_ROOT + "/ingredient-purchase-details?uuid=" + this.state.form.purchase_uuid)} marginLeft={16} marginTop={20} appearance="primary" intent="success">
                                                Submit
                                            </Button>
                                        </div>

                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </Fragment>
        );
    }
}

export default IngredientPurchaseDetailsView;
