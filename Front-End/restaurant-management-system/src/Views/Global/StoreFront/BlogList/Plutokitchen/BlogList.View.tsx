import React, { Fragment, ReactElement } from 'react';
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {FoodBlogCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/FoodBlog";
import SoftDrinksImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/Soft-Drinks.png";
import HotPaleoPizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/img-Hot_Paleo-Pizza.png";
import SpecialBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/Blog/Special-Burger.png";
import {css} from "@emotion/css";
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";


const _css_blog_section_container = css`

  h1.section-heading {
    display: inline-block;
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
    
    @media only screen and (max-width: 600px) {
      display: block;
      float: left;
      margin-top: 0;
    }
  }
  margin-top: 50px;
  margin-bottom: 250px;
`;


const BlogListView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"Blog List"} sub_title={"Blog List"}/>
            <div className={_css_blog_section_container}>
                <div className={CommonStyleSheet.classes.container}>
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
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}/>
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
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <FoodBlogCardScreen
                                src={SoftDrinksImage}
                                date={"Septembar 07,2021   /   Post by jubaidur copy 2"}
                                blog_name={"Soft Drinks"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum maiores neque, odio tempore velit."}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <FooterScreen/>
        </Fragment>
    );
};

export default BlogListView;
