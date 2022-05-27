import React, {Fragment, ReactElement} from 'react';
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {Grid} from "@material-ui/core";
import {Button, Select} from "evergreen-ui";
import {ApiConfig} from "@/App/Config/Api";
import {PurchaseOrderProvider, PurchaseOrderReturnProvider} from "@/App/Services/Providers/Modules/Admin";
import View from "@/Components/Base/View";

class PurchaseReturnDetailsView extends View<any, any> {
    constructor(props: any) {
        super(props);

        this.initialState = {
            grid: {
                purchase_return_order_list: [],
            },
            form: {
                purchase_return_uuid: '',
            }
        }

        this.state = this.initialState;
        this.getAllOrderList = this.getAllOrderList.bind(this);
    }

    private getAllOrderList() {
        PurchaseOrderReturnProvider.getProductPurchaseReturnsNoLimit('', (data) => {
            this.setGridState({purchase_return_order_list: data});
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
                        <div className={"main-container"} style={{paddingTop: '10px'}}>
                            <ModuleTitleScreen
                                moduleTitle={"Purchase Return Details"}
                            />
                            <Grid container spacing={2} style={{marginLeft: "25px"}}>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Invoice
                                        Select <abbr style={{color: 'red'}}>*</abbr></div>
                                    <Select
                                        width={'100%'}
                                        backgroundColor={"#ffffff"}
                                        borderRadius={'5px'}
                                        onChange={(e) => this.setFormState({purchase_return_uuid: e.target.value})}
                                        value={this.state.form.purchase_return_uuid}
                                    >
                                        <option value="">Select Invoice</option>
                                        {this.state.grid.purchase_return_order_list.map((item: any, index: number) => (
                                            <option key={index} value={item.uuid}>{item.code}</option>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 5}}>
                                        <Button onClick={() => window.open(ApiConfig.REPORTS_ROOT + "/purchase-return-details?uuid=" + this.state.form.purchase_return_uuid)} marginLeft={16} marginTop={20} appearance="primary" intent="success">
                                            Submit
                                        </Button>
                                    </div>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </MainLayout>
            </Fragment>
        );
    }
}

export default PurchaseReturnDetailsView;
