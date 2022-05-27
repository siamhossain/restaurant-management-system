import React, { Fragment, ReactElement } from 'react';
import {CartStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Cart";
import Grid from '@material-ui/core/Grid';
import { Button, Tooltip, IconButton, CrossIcon, TextInput, CaretDownIcon, CaretUpIcon } from 'evergreen-ui'
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import BaconBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_bacon_burger.png";
import BolognesePastaImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_bolognese_pasta.png";
import { DataGrid } from '@/Components/Core/DataGrid';


const CartScreen = (): ReactElement => {

    const [quantity, setQuantity] = React.useState(0);



    return (
        <Fragment>
            <div className={CartStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <div className="cart-container">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <div className="cart-table">
                                    <DataGrid.Wrapper>
                                        <DataGrid.Container>
                                            <DataGrid.Header>
                                                <DataGrid.Row>
                                                    <DataGrid.Heading>Product</DataGrid.Heading>
                                                    <DataGrid.Heading>Price</DataGrid.Heading>
                                                    <DataGrid.Heading>Quantity</DataGrid.Heading>
                                                    <DataGrid.Heading>Sub Total</DataGrid.Heading>
                                                </DataGrid.Row>
                                            </DataGrid.Header>
                                            <DataGrid.Body>
                                                <DataGrid.Row>
                                                    <DataGrid.Data style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                                                        <IconButton icon={CrossIcon} className={"cross-icon-btn"}/>
                                                        <img src={BaconBurgerImage} alt=""/>
                                                        <span>Bolognese Pasta</span>
                                                    </DataGrid.Data>
                                                    <DataGrid.Data /*className={"grid-price"}*/ width={100}>360tk</DataGrid.Data>
                                                    <DataGrid.Data /*className={"cart-table-input"}*/>
                                                        <div className={"input-btns"}>
                                                            <TextInput name="text-input-name" placeholder="Qty" value={quantity}/>
                                                            <div className={"quantity-action-btns"}>
                                                                <CaretUpIcon onClick={() => setQuantity(quantity + 1)}/>
                                                                <CaretDownIcon onClick={() => setQuantity(quantity - 1)}/>
                                                            </div>
                                                        </div>
                                                    </DataGrid.Data>
                                                    <DataGrid.Data /*className={"grid-sub-total"}*/ width={100}>720 tk</DataGrid.Data>
                                                </DataGrid.Row>
                                                <DataGrid.Row>
                                                    <DataGrid.Data style={{display: "flex", justifyContent: "center", alignItems: "center"  }}>
                                                        <IconButton icon={CrossIcon} className={"cross-icon-btn"}/>
                                                        <img src={BolognesePastaImage} alt=""/>
                                                        <span>Bolognese Pasta</span>
                                                    </DataGrid.Data>
                                                    <DataGrid.Data>360tk</DataGrid.Data>
                                                    <DataGrid.Data /*className={"cart-table-input"}*/>
                                                        <div className={"input-btns"}>
                                                            <TextInput name="text-input-name" placeholder="Qty" value={quantity}/>
                                                            <div className={"quantity-action-btns"}>
                                                                <CaretUpIcon onClick={() => setQuantity( quantity + 1)}/>
                                                                <CaretDownIcon onClick={() => setQuantity(quantity - 1)}/>
                                                            </div>
                                                        </div>
                                                    </DataGrid.Data>
                                                    <DataGrid.Data>720 tk</DataGrid.Data>
                                                </DataGrid.Row>
                                            </DataGrid.Body>
                                        </DataGrid.Container>
                                    </DataGrid.Wrapper>
                                </div>
                                <div className="cart-action-buttons">
                                    <Button marginRight={12} size="medium" className={"couponCode-btn"}>Coupon code</Button>
                                    <Button marginRight={12} size="medium" className={"applyCoupon-btn"}>Apply coupon</Button>
                                    <Button marginRight={12} size="medium" className={"updateCart-btn"}>Update cart</Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div className="cart-total-container">
                                    <h3 className="cart-total-heading">Cart Total</h3>
                                    <table className={"Cart-totals-Table"} cellSpacing={0} cellPadding={0}>
                                        <DataGrid.Row>
                                            <DataGrid.Data>Sub Total</DataGrid.Data>
                                            <DataGrid.Data>1000 tk</DataGrid.Data>
                                        </DataGrid.Row>
                                        <DataGrid.Row>
                                            <DataGrid.Data>Total</DataGrid.Data>
                                            <DataGrid.Data>1000 tk</DataGrid.Data>
                                        </DataGrid.Row>
                                    </table>
                                    <div className={"proceed-btn"}>
                                        <Button marginRight={12} size="medium">Proceed to Checkout</Button>
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

export { CartScreen };
