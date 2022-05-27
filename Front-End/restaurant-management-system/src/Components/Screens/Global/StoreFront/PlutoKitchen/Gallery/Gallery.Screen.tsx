import React, { Fragment, ReactElement } from 'react';
import {GalleryStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Gallery";
import Grid from "@material-ui/core/Grid";
import WingImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/wing-img.png";
import PastaImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/pasta-img.png";
import PizzaImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/pizza-img.png";
import DrinkImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/drink-img.png";
import BergerImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/berger-img.png";
import SandwichImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/sandwich-img.png";
import RollImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/roll-img.png";
import SetMenuImage  from "@/Static/Images/StoreFront/PlutoKitchen/Gallery/setmenu-img.png";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {GalleryImageScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Gallery/GalleryImage.Screen";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";

const GalleryScreen = (): ReactElement => {
    return (
        <Fragment>
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


                    <div className="see-all-button">
                        <button className={"see-all-btn"}><span><RouterProvider.Link to={ROUTE_PATHS.GLOBAL.GALLERY_IMAGES}>See All</RouterProvider.Link></span></button>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export { GalleryScreen };
