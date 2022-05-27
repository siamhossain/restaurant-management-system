import React, { Fragment, ReactElement } from 'react';
import {ContactPageStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/contactPage";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@/Static/Icons/email-icon.png";
import LocationIcone from "@/Static/Icons/location-icon.png";
import PhoneIcone from "@/Static/Icons/phone-icon.png";
import {ContactCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Contact/ContactCard";
import {ContactFromScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Contact/ContactFrom";


const ContactPageScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={ContactPageStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ContactCardScreen src={EmailIcon} contact_name={"Email Address"} address={"info@edorpon.com"}/>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ContactCardScreen src={PhoneIcone} contact_name={"PHONE NUMBER"} address={"+8801888015000"}/>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ContactCardScreen src={LocationIcone} contact_name={"OUR LOCATION"} address={"House#735, Road#11, Avenue#4, Mirpur DOHS, Dhaka, Bangladesh"}/>
                        </Grid>

                        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                            <ContactFromScreen/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { ContactPageScreen };
