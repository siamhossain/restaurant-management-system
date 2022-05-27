import React, { Fragment, ReactElement } from 'react';
import {ChefCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/About/Chefs/ChefCard.Screen";
import Chef1Image from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Our Chefs/imgchef1.png";
import Chef2Image from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Our Chefs/imgchef2.png";
import Chef3Image from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/Our Chefs/imgchef3.png";
import Grid from '@material-ui/core/Grid';
import {css} from "@emotion/css";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";

const __css_Chef_section = css`
  margin-top: 70px;
  margin-bottom: 70px;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 44px;
    @media only screen and (max-width: 900px) {
      font-size: 30px;
    }
    span {
      color: rgb(255, 210, 3);
    }
  }
`;


const ChefsScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={__css_Chef_section}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className="section-title"><span>Our</span> Chefs</h1>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ChefCardScreen src={Chef1Image} name={"Alisha zara"} designation={"Chef"} details={"Everything We Pizza, We Pizza With Love. Designer Fastfood."}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ChefCardScreen src={Chef2Image} name={"Tahmid Joy"} designation={"Manager"} details={"Everything We Pizza, We Pizza With Love. Designer Fastfood."}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <ChefCardScreen src={Chef3Image} name={"Rezvi Ahmed"} designation={"Chef"} details={"Everything We Pizza, We Pizza With Love. Designer Fastfood."}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { ChefsScreen };
