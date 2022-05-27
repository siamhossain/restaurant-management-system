import React, { Fragment, ReactElement } from 'react';
import {AboutUsStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/AboutUs";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";

const AboutUsInfoScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={AboutUsStyleSheet.classes.root}>
                <div className="about-us-container">
                    <div className="about-us-info">
                            <h3>About Us</h3>
                            <h2> We Are Tasty</h2>
                            <div className="about_details">
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsumultrices gravida. Risus                                          commodo viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua. Quis ipsumultrices gravida.
                                 </p>
                            </div>

                            {/*<button>Read more</button>*/}
                        <button className={"see-all-btn"}><span><RouterProvider.Link to={ROUTE_PATHS.GLOBAL.ABOUT_US}>Read more</RouterProvider.Link></span></button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { AboutUsInfoScreen };
