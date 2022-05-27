import React, { Fragment, ReactElement } from 'react';
import {FoodReviewCardStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/FoodReviews";


interface IFoodReviewCardScreenProps {
    src: string,
    name: string,
    sub_title: string,
    review_comment: string,
}

const FoodReviewCardScreen: React.FC<IFoodReviewCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={FoodReviewCardStyleSheet.classes.root}>
                        <div className="review-card-container">
                    <div className="review-card-img">
                        <img src={props.src} alt=""/>
                    </div>
                    <div className="review-card-info">
                         <h3 className={"reviewer-name"}>{props.name}</h3>
                        <p className={"sub-title"}>{props.sub_title}</p>
                        <p className={"review-comment"}>{props.review_comment}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { FoodReviewCardScreen };
