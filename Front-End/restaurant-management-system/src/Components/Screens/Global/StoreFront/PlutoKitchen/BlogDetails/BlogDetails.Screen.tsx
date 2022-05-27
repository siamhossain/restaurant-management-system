import React, { Fragment, ReactElement } from 'react';
import {BlogDetailsStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/BlogDetails";
import Grid from "@material-ui/core/Grid";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import PizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/BlogDetails/hot-paleo-pizza.png";
import PizzaImage1 from "@/Static/Images/StoreFront/PlutoKitchen/BlogDetails/pizza-img1.png";
import PizzaImage2 from "@/Static/Images/StoreFront/PlutoKitchen/BlogDetails/pizza-img2.png";
import SearchIcon from '@/Static/Icons/search-icon.png';
import {TextInputField} from "evergreen-ui";
import RecentPostImage1 from "@/Static/Images/StoreFront/PlutoKitchen/RecentPost/recent-post-01.png";
import RecentPostImage2 from "@/Static/Images/StoreFront/PlutoKitchen/RecentPost/recent-post-02.png";
import RecentPostImage3 from "@/Static/Images/StoreFront/PlutoKitchen/RecentPost/recent-post-03.png";
import {HeadlineBannerScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/Common/HeadlineBanner";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";

import Chip from '@material-ui/core/Chip';
// import Stack from '@material-ui/core/Stack';

const BlogDetailsScreen = (): ReactElement => {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Fragment>
            <div className={BlogDetailsStyleSheet.classes.root}>
                <HeadlineBannerScreen title={"Blog"} sub_title={"Blog: Hot Paleo Pizza"} />
                <div className={CommonStyleSheet.classes.container}>
                    <div className={"blog-details-section"}>
                        <div className="blog-details-container">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <div className="blog-details-img">
                                        <img src={PizzaImage} alt="{Image}"/>
                                    </div>
                                    <div className="img-title">
                                        <h1>Hot Paleo Pizza</h1>
                                        <p>Septembar 07,2021   /   Post by jubaidur</p>
                                    </div>
                                    <p>Pizzhen an unknown printer took a galley of type and scrambled it to make a type specimen bookIt hasey
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch anged. It was popularised in tf Letraset sheets containing.Pizzhen an unknown printer took a galley of typ survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch anged. It was
                                        popularised in tf Letraset sheets containing.</p>

                                    <h3>“It was popularised in the 1960s with the release circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us Nam libero tempore, cum soluta nobis est eligendi.”</h3>

                                    <p>Pizzhen an unknown printer took a galley of type and scrambled it to make a type specimen bookIt hasey
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch anged. It was popularised in tf Letraset sheets                                     containing.</p>

                                    <Grid container spacing={2}>
                                        <Grid item xl={6}>
                                            <div className="blog-img">
                                                <img src={PizzaImage1} alt="{Image}"/>
                                            </div>
                                        </Grid>

                                        <Grid item xl={6}>
                                            <div className="blog-img">
                                                <img src={PizzaImage2} alt="{Image}"/>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <p>Pizzhen an unknown printer took a galley of type and scrambled it to make a type specimen bookIt hasey survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch anged. It was popularised in tf Letraset sheets containing.</p>


                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>

                                    <div className="blog-details-input">
                                        <table cellSpacing={0} cellPadding={0} className={"blog-details-input-table"}>
                                            <tbody>
                                            <tr>
                                                <td className={"search-input"}><TextInputField placeholder="Your email address" /></td>
                                                <td><button><img src={SearchIcon} alt=""/></button></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="categories">
                                        <h2>Categories</h2>
                                        <ul className={"categories-item-list"}>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Burger <span> 02 </span> </RouterProvider.Link></li>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Chicken <span> 02 </span></RouterProvider.Link></li>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Drinks <span> 02 </span></RouterProvider.Link></li>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Fries <span> 02 </span></RouterProvider.Link></li>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Pizza <span> 02 </span></RouterProvider.Link></li>
                                            <li><RouterProvider.Link className={"categories-item"} to={""}>Sandwich <span> 02 </span></RouterProvider.Link></li>
                                        </ul>
                                    </div>

                                    <div className="Popular-tags">
                                        <h2>Popular tags</h2>
                                        <Chip
                                            label="Burger"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                        <Chip
                                            label="Chick"
                                            variant="outlined"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                        <Chip
                                            label="Drinks"
                                            variant="outlined"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                        <Chip
                                            label="Fries"
                                            variant="outlined"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                        <Chip
                                            label="Nugget"
                                            variant="outlined"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                        <Chip
                                            label="Pizza"
                                            variant="outlined"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                        />
                                    </div>

                                     <div className="recent-post-container">
                                         <h1>Last Posts</h1>
                                            <div className="post-wrapper">
                                                <div className="recent-post-img">
                                                    <img src={RecentPostImage1} alt="{RecentPostImage1}"/>
                                                </div>
                                                <div className="food-title">
                                                    <h1>The Best Easy One Pot <br/>Chicken & Rice Recipe</h1>
                                                    <p>September 7, 2021</p>
                                                </div>
                                            </div>

                                            <div className="post-wrapper">
                                                <div className="recent-post-img">
                                                    <img src={RecentPostImage2} alt="{RecentPostImage1}"/>
                                                </div>
                                                <div className="food-title">
                                                    <h1>The Best Easy One Pot <br/>Chicken & Rice Recipe</h1>
                                                    <p>September 7, 2021</p>
                                                </div>
                                            </div>

                                            <div className="post-wrapper">
                                                <div className="recent-post-img">
                                                    <img src={RecentPostImage3} alt="{RecentPostImage1}"/>
                                                </div>
                                                <div className="food-title">
                                                    <h1>The Best Easy One Pot <br/>Chicken & Rice Recipe</h1>
                                                    <p>September 7, 2021</p>
                                                </div>
                                            </div>
                                     </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { BlogDetailsScreen };
