import React, { Fragment, ReactElement } from 'react';
import {ProductImagesScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/ProductDetails/ProductImages";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {ProductInfoScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/ProductDetails/ProductInfo";
import {ProductDescriptionTabScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/ProductDetails/ProductDescriptionTab";

const ProductDetailsView = (): ReactElement => {
    return (
        <Fragment>
            <div style={{margin: "70px 0 150px 0"}}>
                <Container>
                    <Grid container spacing={8}>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <ProductImagesScreen/>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <ProductInfoScreen product_name={"Bacon Burger"} product_quality={"A mighty meaty double helping of all the reasons you love our burger"} product_price={"300Tk"}/>
                        </Grid>
                    </Grid>
                    <ProductDescriptionTabScreen/>
                </Container>
            </div>
        </Fragment>
    );
};

export default ProductDetailsView;
