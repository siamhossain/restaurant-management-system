import React, { Fragment, ReactElement } from 'react';
import {HeaderScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Header";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {GalleryStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Gallery";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {GalleryImageScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Gallery";
import WingImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/wing-img.png";
import PastaImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/pasta-img.png";
import PizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/pizza-img.png";
import DrinkImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/drink-img.png";
import BergerImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/berger-img.png";
import SandwichImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/sandwich-img.png";
import RollImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/roll-img.png";
import SetMenuImage from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/setmenu-img.png";
import {FooterScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/Footer";

const GalleryImagesView = (): ReactElement => {
    return (
        <Fragment>
            <HeaderScreen/>
            <HeadlineBannerScreen title={"Gallery Images"} sub_title={"Gallery Images"}/>
            <div className={GalleryStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <h1 className={"section-heading"}><span>Restaurents</span> Gallery</h1>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={WingImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={PastaImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={PizzaImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={DrinkImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={BergerImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={SandwichImage}
                            />
                        </Grid>


                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={RollImage}
                            />
                        </Grid>

                        <Grid item xs={12}  sm={6} md={4} lg={4} xl={3}>
                            <GalleryImageScreen
                                src={SetMenuImage}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <FooterScreen/>
        </Fragment>
    );
};

export default GalleryImagesView;
