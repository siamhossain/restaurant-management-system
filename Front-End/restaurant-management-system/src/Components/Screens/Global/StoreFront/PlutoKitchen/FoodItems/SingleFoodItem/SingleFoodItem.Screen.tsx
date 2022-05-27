import React, { Fragment, ReactElement } from 'react';
import {SingleFoodItemStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/FoodItems";
import {Link} from "react-router-dom";
import {ROUTE_PATHS} from "@/Routes";


interface IFoodItemsScreen {
    src: string,
    food_name: string,
}

const SingleFoodItemScreen: React.FC<IFoodItemsScreen> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={SingleFoodItemStyleSheet.classes.root}>
                <Link to={ROUTE_PATHS.GLOBAL.CATEGORY_LIST}>
                    <div className={"food-item-wrapper"}>
                        <div className="food-item-img">
                            <img src={props.src} alt="qualityFood"/>
                        </div>
                        <div className="single-food-item-name">
                            <p>{props.food_name}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </Fragment>
    );
};

export { SingleFoodItemScreen };


