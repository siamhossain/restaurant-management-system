import React, { Fragment, ReactElement } from 'react';
import {ProfileMenu} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/ProfileMenu/ProfileMenu";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {OrderListScreen} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/OrderList";
import Grid from '@material-ui/core/Grid';
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const OrderListView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"My Account"} sub_title={"My Account"} />
            <div className={CommonStyleSheet.classes.container}>
                <div style={{marginTop: "70px", marginBottom: "70px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <div  style={{border: "1px solid #e5e5e5", padding: "25px 10px 100px 30px"}}>
                                <ProfileMenu/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            <OrderListScreen/>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <FooterScreen/>
        </Fragment>
    );
};

export default OrderListView;
