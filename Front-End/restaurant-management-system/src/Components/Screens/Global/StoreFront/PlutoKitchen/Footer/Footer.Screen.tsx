import React, { Fragment, ReactElement } from 'react';
import Grid from "@material-ui/core/Grid";
import {FooterStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Footer";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import Logo from "@/Static/Images/StoreFront/PlutoKitchen/Header/Logo.png";
import { TextInputField } from 'evergreen-ui'
import facebookIcon from '@/Static/Icons/ic-facebook.png';
import instagramIcon from '@/Static/Icons/ic-instagram.png';
import twitterIcon from '@/Static/Icons/ic-twitter.png';
import linkedinIcon from '@/Static/Icons/ic-linkedin.png';
import {BookTableScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/BookTable";
import {css} from "@emotion/css";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";


const __css_book_table_section = css`
  position: relative;
  top: -140px;
  
  @media only screen and (max-width: 900px) {
    top: 0 !important;
  }
`;


const FooterScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={FooterStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className={__css_book_table_section}>
                        <BookTableScreen/>
                    </div>
                    <div className="footer-container">
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                <div className="footer-about">
                                    <div className="logo">
                                        <img src={Logo} alt="Logo"/>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore facilisis. </p>
                                    <div className="newsletter">
                                        <h3>Newsletter</h3>
                                        <p>Subscribe to get the latest news,</p>
                                        <div className="newsletter-input">
                                            <table cellSpacing={0} cellPadding={0} className={"newsletter-input-table"}>
                                                <tbody>
                                                    <tr>
                                                        <td><TextInputField placeholder="Your email address" /></td>
                                                        <td><button>Send</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                <div className="social-media">
                                    <h2 className={"footer-heading"}>We Are Social</h2>
                                    <div className={"social-icon"}>
                                        <RouterProvider.Link to={""}> <img src={facebookIcon} alt="facebook" />Facebook</RouterProvider.Link>
                                    </div>
                                    <div className={"social-icon"}>
                                        <RouterProvider.Link to={""}> <img src={instagramIcon} alt="instagram" />Instagram</RouterProvider.Link>
                                    </div>
                                    <div className={"social-icon"}>
                                        <RouterProvider.Link to={""}> <img src={twitterIcon} alt="twitter" />Twitter</RouterProvider.Link>
                                    </div>
                                    <div className={"social-icon"}>
                                        <RouterProvider.Link to={""}> <img src={linkedinIcon} alt="linkedin" />Linkedin</RouterProvider.Link>
                                    </div>

                                </div>

                            </Grid>


                            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                <div className="contact-info">
                                    <h2 className={"footer-heading"}>Get In Touch</h2>
                                    <div className="email">
                                        <h4>Email:</h4>
                                        <p>+info@edorpon.com</p>
                                    </div>
                                    <div className="phone">
                                        <h4>Phone:</h4>
                                        <p>+8801888015000</p>
                                    </div>
                                    <div className="Address">
                                         <h4>Address:</h4>
                                        <p>House#735, Road#11,  <br/>Avenue#4, Mirpur DOHS, <br/>Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                <div className="opening-hours">
                                    <h2 className={"footer-heading"}>Get In Touch</h2>
                                    <p>Opening Hours</p>
                                    <p>Monday : 09.00am-10.00pm</p>
                                    <p>  Tuesday : 09.00am-10.00pm</p>
                                    <p> Wednesday : 09.00am-10.00pm</p>
                                    <p>  Thursday : 09.00am-10.00pm</p>
                                    <p>   Friday : 09.00am-10.00pm</p>
                                    <p>Saturday & Sunday : Closed</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div>

        </Fragment>
    );
};

export { FooterScreen };
