import React, { Fragment, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import {FoodBlogCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodBlog/FoodBlogCard.Screen";

import HotPaleoPizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/img-Hot_Paleo-Pizza.png";
import SoftDrinksImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/Soft-Drinks.png";
import SpecialBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/Special-Burger.png";
import {css} from "@emotion/css";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";


const _css_blog_section_container = css`

  h1.section-heading {
    display: inline-block;
    @media only screen and (max-width: 500px) {
       font-size: 27px;
    }
  }
  button.see-all-btn {
    display: inline-block;
    float: right;
    border-radius: 5px;
    background-color: rgb(0, 0, 0);
    width: 95px;
    height: 34px;
    font-size: 15px;
    color: rgb(255, 194, 34);
    margin-top: 35px;
    cursor: pointer;
    :hover {
      background: #414141;
      transition: 0.5s;
    }
    
    @media only screen and (max-width: 600px) {
      display: block;
      float: none;
      margin-top: 0;
      margin-bottom: 15px;
    }
  }
  margin-top: 50px;
  margin-bottom: 250px;
  @media only screen and (max-width: 900px) {
    //margin-top: 0;
    margin-bottom: 90px;
  }
`;


const FoodBlogScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={_css_blog_section_container}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className={"section-heading"}>Latest Blog</h1>
                    <button className={"see-all-btn"}><span><RouterProvider.Link to={ROUTE_PATHS.GLOBAL.BLOG_LIST}>See All</RouterProvider.Link></span></button>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <FoodBlogCardScreen
                                src={SoftDrinksImage}
                                date={"Septembar 07,2021   /   Post by jubaidur copy 2"}
                                blog_name={"Soft Drinks"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <FoodBlogCardScreen
                                src={HotPaleoPizzaImage}
                                date={"Septembar 07,2021   /   Post by jubaidur copy 2"}
                                blog_name={"Soft Drinks"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <FoodBlogCardScreen
                                src={SpecialBurgerImage}
                                date={"Septembar 07,2021   /   Post by jubaidur copy 2"}
                                blog_name={"Special Burger"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { FoodBlogScreen };
