import React, { Fragment, ReactElement } from 'react';
import {AboutUsInfoScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/AboutUs/AboutUsInfo.Screen";
import Grid from '@material-ui/core/Grid';
import Image from "@/Static/Images/StoreFront/PlutoKitchen/About Us/About-Us.png";
import {css} from "@emotion/css";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";

const __css_home_about = css`
  margin-bottom: 100px;
  background: #f7f7f7;

  @media only screen and (max-width: 1050px){
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 800px){
    margin-bottom: 40px;
  }
  .about_img {
    text-align: right;
    padding-right: 40px;
    img {
      @media only screen and (max-width: 400px) {
         width: 100%;
      }
    }
    @media only screen and (max-width: 960px) {
         text-align: center;
         padding-right: 0px;
         padding: 0 15px;
    }
  }
`;


const AboutUsScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={__css_home_about}>
                <div className={CommonStyleSheet.classes.container} style={{padding: "50px 0"}}>
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="about_img">
                                <img src={Image} alt="{Image}"/>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <AboutUsInfoScreen/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { AboutUsScreen };
