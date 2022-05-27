import React, { Fragment, ReactElement } from 'react';
import {SpecialMenuCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/SpecialMenu/SpecialMenuCard.Screen";
import Grid from '@material-ui/core/Grid';
import BaconBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_bacon_burger.png";
import BolognesePastaImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_bolognese_pasta.png";
import ChocolateMuffinImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_chocolate_muffin.png";
import DoubleCheeseBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_double_cheese_Burger.png";
import GrillBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_grill.png";
import PenneFunghiChickenImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_penne_funghi_chicken.png";
import SpaghettiBologneseImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_spaghetti_bolognese.png";
import WranglerBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/SpecialMenu/img_wrangler_burger.png";
import {css} from "@emotion/css";
import {Link} from "react-router-dom";
import { Button } from 'evergreen-ui'
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {ROUTE_PATHS} from "@/Routes";


const __css_special_menu_container = css`
  
  padding-bottom: 100px;
  @media only screen and (max-width:1050px) {
    padding-bottom: 40px;
  }
  
  .see-all-btn {
    margin: 0 0 20px 0;
    text-align: right;
    a {
      padding: 8px 20px;
      border-radius: 5px;
      background: #ffa62b;
      color: #fff;
      font-weight: bold;
      :hover {
        background: #ffa62b;
      }
    }
  }
  
  .section-heading {
    text-align: center;
    
    @media only screen and (max-width:600px) {
      font-size: 23px;
    }
    span {
        color: #fe9400;
    }
  }
  .menu-filter-buttons {
    margin-bottom: 35px;
    text-align: center;
    button {
      color: black;
      margin-bottom: 10px;
    }
    button:active {
      background: #fe9400;
    }
    button:focus {
      background: #ffc222;
      font-weight: bold;
      color: black;
    }
  }

`;


const SpecialMenuScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={__css_special_menu_container}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className={"section-heading"}><span>Special</span> Menu</h1>
                    <div className="menu-filter-buttons">
                        <Button marginRight={12} size="small">All</Button>
                        <Button marginRight={12} size="small">Breakfast</Button>
                        <Button marginRight={12} size="small">Lunch</Button>
                        <Button marginRight={12} size="small">Dinner</Button>
                        <Button marginRight={12} size="small">Drinks</Button>
                    </div>

                    <div className="see-all-btn">
                        <Link to={ROUTE_PATHS.GLOBAL.SHOP}>See All</Link>
                    </div>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={BaconBurgerImage} menu_name={"Bacon Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={ChocolateMuffinImage} menu_name={"Bolognese Pasta"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={WranglerBurgerImage} menu_name={"Chocolate Muffin"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={DoubleCheeseBurgerImage} menu_name={"Double Cheese Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={BolognesePastaImage} menu_name={"Double Cheese Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={PenneFunghiChickenImage} menu_name={"Double Cheese Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={SpaghettiBologneseImage} menu_name={"Double Cheese Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <SpecialMenuCardScreen src={GrillBurgerImage} menu_name={"Double Cheese Burger"} price={"300"} compare_at_price={"350"}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { SpecialMenuScreen };
