import React, { Fragment, ReactElement } from 'react';
import {FoodBlogCardStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/FoodBlog";


interface IFoodBlogCardScreenProps {
    src: string,
    date: string,
    blog_name: string,
    description: string,


}


const FoodBlogCardScreen: React.FC<IFoodBlogCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={FoodBlogCardStyleSheet.classes.root}>
                <div className="card-container">
                    <div className="card-bg" style={{background: "url(" + props.src + ")" }}> </div>
                    <div className="card-info">
                        <div className="date-and-postBy">
                            {props.date}
                        </div>
                        <div className="blog-name">
                            {props.blog_name}
                        </div>
                        <p className={"description"}>{props.description}</p>
                        <button className={"read-more"}>Read More</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { FoodBlogCardScreen };
