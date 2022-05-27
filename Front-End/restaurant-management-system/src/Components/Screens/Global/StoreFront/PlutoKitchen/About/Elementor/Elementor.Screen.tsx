import React, { Fragment, ReactElement } from 'react';
import {ElementorElementScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Elementor/ElementorElement.Screen";
import ElementorBGImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/BG.png";
import IngredientsIcon from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/Professional-Chefs.png";
import FoodItemIcon from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/Items-Of-Foods.png";
import YearsOfExperienceIcon from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/Years-Of-Experience.png";
import SaticfiedCustomersIcon from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/Saticfied-Customers.png";
import Grid from '@material-ui/core/Grid';
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";


const ElementorScreen = (): ReactElement => {
    return (
        <Fragment>
            <div style={{background: "url(" + ElementorBGImage + ")", padding: "80px 0"}}>
                <div className={CommonStyleSheet.classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            <ElementorElementScreen src={IngredientsIcon} title={"Professional Chefs"} count_num={300}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            <ElementorElementScreen src={FoodItemIcon} title={"Items Of Foods"} count_num={1000}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            <ElementorElementScreen src={YearsOfExperienceIcon} title={"Years Of Experience"} count_num={500}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            <ElementorElementScreen src={SaticfiedCustomersIcon} title={"Saticfied Customers"} count_num={300}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { ElementorScreen };
