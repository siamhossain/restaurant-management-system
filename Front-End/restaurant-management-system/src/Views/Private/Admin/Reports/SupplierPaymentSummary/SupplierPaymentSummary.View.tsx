import React, {Fragment, ReactElement} from 'react';
import {SideBarScreen} from "@/Components/Screens/Private/Admin/SideBar";
import {HeaderScreen} from "@/Components/Screens/Private/Admin/Header";
import {MainLayout} from "@/Components/Layouts/Private/Admin/Main";
import {parseDate} from "@/App/Functions/Custom";
import {UserProvider} from "@/App/Services/Providers/Modules/Admin";
import {ModuleTitleScreen} from "@/Components/Screens/Private/Admin/ModuleTitle";
import {Grid} from "@material-ui/core";
import Datetime from "react-datetime";
import {css} from "@emotion/css";
import {SupplierDropdownScreen} from "@/Components/Screens/Private/Admin/Supplier/SupplierDropdown.Screen";
import {Button, Select} from "evergreen-ui";
import {ApiConfig} from "@/App/Config/Api";
import View from "@/Components/Base/View";

class SupplierPaymentSummaryView extends View<any, any> {

    constructor(props: any) {
        super(props);

        this.initialState = {
            grid: {
                user_list: [],
            },

            form: {
                supplier_uuid: '',
                user_uuid: '',
                from_date: parseDate(new Date()),
                to_date: parseDate(new Date()),
            }
        }

        this.state = this.initialState;
        this.getAllUserList = this.getAllUserList.bind(this);
    }

    private getAllUserList() {
        UserProvider.getUsersNoLimit('', (data) => {
            this.setGridState({user_list: data});
        })
    }

    componentDidMount(): void {
        this.getAllUserList()
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
                                moduleTitle={"Supplier Payment Summary"}
                            />
                            <Grid container spacing={2} style={{marginLeft: "25px"}}>
                                <Grid item lg={2}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>From Date</div>
                                    <Datetime
                                        value={parseDate(this.state.form.from_date)}
                                        onChange={(date: any) => this.setFormState({from_date: parseDate(date)})}
                                        timeFormat={false}
                                        className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                                    />
                                </Grid>
                                <Grid item lg={2}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>To Date</div>
                                    <Datetime
                                        value={parseDate(this.state.form.to_date)}
                                        onChange={(date: any) => this.setFormState({to_date: parseDate(date)})}
                                        timeFormat={false}
                                        className={css`position: absolute; border: 1px solid #ddd; padding: 3px 10px; * {outline: 0}`}

                                    />
                                </Grid>
                                <Grid item lg={2}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Supplier</div>
                                    <SupplierDropdownScreen
                                        uuid={this.state.form.supplier_uuid}
                                        onChange={(uuid) => this.setFormState({supplier_uuid: uuid})}
                                        width={'100%'}
                                    />

                                </Grid>
                                <Grid item lg={2}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select User</div>
                                    <Select
                                        width={'100%'}
                                        backgroundColor={"#ffffff"}
                                        borderRadius={'5px'}
                                        onChange={(e) => this.setFormState({user_uuid: e.target.value})}
                                        value={this.state.form.user_uuid}
                                    >
                                        <option value="">Select User</option>
                                        {this.state.grid.user_list.map((item: any, index: number) => (
                                            <option key={index} value={item.uuid}>{item.name}</option>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item lg={3}>
                                    <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 5}}>
                                        <Button onClick={() => window.open(ApiConfig.REPORTS_ROOT + "/supplier-payment-summary?from_date=" + this.state.form.from_date + "&to_date=" + this.state.form.to_date + "&user_uuid=" + this.state.form.user_uuid + "&supplier_uuid=" + this.state.form.supplier_uuid)} marginLeft={16} marginTop={20} appearance="primary" intent="success">
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

export default SupplierPaymentSummaryView;
