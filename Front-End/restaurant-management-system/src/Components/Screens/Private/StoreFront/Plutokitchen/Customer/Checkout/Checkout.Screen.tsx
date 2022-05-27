import React, { Fragment, ReactElement } from 'react';
import {CheckoutStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Checkout";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {TextInputField} from "evergreen-ui";
import { Pane, Radio } from 'evergreen-ui';
import {RouterProvider} from "@/App/Services/Providers/Core/Router";

const CheckoutScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={CheckoutStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="checkout-section">
                        <p className="coupon-code">Have a coupon? <span>Click here to enter your code</span> </p>

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={7} xl={8}>
                                <h1>Billing address</h1>
                                <div className="billing-address">
                                    <TextInputField
                                        description="FIRST NAME *"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="LAST NAME *"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="PHONE*"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="EMAIL*"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="COMPANY NAME(optional)"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="STREET ADDRESS"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <TextInputField
                                        description="TOWN/CITY*"
                                        className={"first-name"}
                                        placeholder=" "
                                    />

                                    <h1>ADDITIONAL INFORMATION</h1>

                                    <TextInputField
                                        description="ORDER NOTICE(OPTIONAL)"
                                        className={"order-notice"}
                                        placeholder="Note about your order, e.g. speacial notes for delivery "
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
                                <h1 className="your-order">Your Order</h1>
                                <div className="your-order-section">
                                    <ul className={"your-order-list"}>
                                        <li><RouterProvider.Link className={"order-item"} to={""}>Product <span> Subtotal</span> </RouterProvider.Link></li>
                                        <li><RouterProvider.Link className={"order-item"} to={""}>Attribute Variation - L, Black  × 2	$9.10 <span> $79.00 </span></RouterProvider.Link></li>
                                        <li><RouterProvider.Link className={"order-item"} to={""}>Subtotal <span>$79.00</span></RouterProvider.Link></li>
                                        <li><RouterProvider.Link className={"order-item"} to={""}>Total	 <span>$79.00</span></RouterProvider.Link></li>
                                    </ul>

                                    <div className="payment-section">
                                        <div className="payment-method">
                                            <Pane aria-label="Radio Group Label 12" role="group">
                                                <Radio name="group" checked label="Direct bank transfer" />
                                                <Radio name="group" checked label="Check payments" />
                                                <Radio name="group" checked label="Cash on delivery" />
                                                <Radio name="group" checked label="PayPal acceptance What is PayPal?" />
                                            </Pane>
                                        </div>
                                    </div>

                                    <p className="order-bottom">
                                        Your personal data will be used to process your <br/> order, support your experience throughout this<br/> website, and for other purposes described in our<br/>                                            privacy policy.
                                    </p>

                                    <div className="button">
                                        <button>place order</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { CheckoutScreen };
