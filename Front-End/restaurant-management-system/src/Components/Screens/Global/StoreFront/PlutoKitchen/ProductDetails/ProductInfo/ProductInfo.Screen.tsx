import React, { Fragment, ReactElement } from 'react';
import {ProductInfoStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ProductInfo";
import { Button } from 'evergreen-ui'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from "@material-ui/core";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import facebookBlackIcon from "@/Static/Icons/ic_facebook_black.png";
import instagramBlackIcon from "@/Static/Icons/ic_instagram_black.png";
import twitterBlackIcon from "@/Static/Icons/ic_twitter_black.png";
import linkedinBlackIcon from "@/Static/Icons/ic_linkdin_black.png";
import Rating from '@material-ui/lab/Rating';


interface IProductInfoScreenProps {
    product_name: string,
    product_quality: string,
    product_price: string,

}


const ProductInfoScreen: React.FC<IProductInfoScreenProps> = (props): ReactElement => {


    const [quantity, setQuantity] = React.useState(0)

    const [isFavorite, setIsFavorite] = React.useState(false);



    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <Fragment>
            <div className={ProductInfoStyleSheet.classes.root}>
                <div className="product-info-container">
                    <div className="rating">
                        <div className={""}>
                            <Rating name="size-small" defaultValue={2} size="small"/>
                        </div>
                    </div>
                    <h1 className="product-name">{props.product_name}</h1>
                    <p className="product-quality">{props.product_quality}</p>
                    <h3 className="product-price">{props.product_price}</h3>
                    <div className="actions">
                        <div className="quantity">
                            <Button marginRight={16} size="small" onClick={() => setQuantity(quantity - 1)}><span>-</span></Button>
                            <span>{quantity}</span>
                            <Button marginRight={16} size="small" marginLeft={16} onClick={() => setQuantity(quantity + 1)}><span>+</span></Button>
                        </div>
                        <div className={"fav_icon"}>
                            <IconButton
                                component="span"
                                onClick={handleFavorite}>
                                {isFavorite ? (
                                    <FavoriteIcon/>
                                ) : (
                                    <FavoriteBorderIcon/>
                                )}
                            </IconButton>
                        </div>
                        <Button marginRight={0} size="small" marginLeft={0} className={"add-to-cart-btn"} onClick={() => {}}>Add to Cart</Button>
                    </div>
                    <p className={"category-name"}>Category: <b>Bacon Burger</b></p>
                    <div className="description">
                        <ul>
                            <li>Free global shipping on all orders</li>
                            <li>30 days easy returns if you change your mind</li>
                            <li>Order Before noon for some day dispatch</li>
                        </ul>
                    </div>
                    <div className="social-links">
                        <span>Share: </span>
                            <div className="social-icon">
                                <RouterProvider.Link to={""}> <img src={facebookBlackIcon} alt="facebook" /></RouterProvider.Link>
                            </div>
                            <div className="social-icon">
                                <RouterProvider.Link to={""}> <img src={instagramBlackIcon} alt="instagram" /></RouterProvider.Link>
                            </div>
                            <div className="social-icon">
                                <RouterProvider.Link to={""}> <img src={twitterBlackIcon} alt="twitter" /></RouterProvider.Link>
                            </div>
                            <div className="social-icon">
                                <RouterProvider.Link to={""}> <img src={linkedinBlackIcon} alt="linkedin" /></RouterProvider.Link>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ProductInfoScreen };
