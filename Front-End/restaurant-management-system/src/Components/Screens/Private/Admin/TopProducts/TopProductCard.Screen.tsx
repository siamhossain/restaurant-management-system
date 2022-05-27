import React, { Fragment, ReactElement } from 'react';
import {TopProductCardStyleSheet} from "@/Static/StyleSheets/Admin/TopProductCard";
import {cdn} from "@/App/Functions/Custom";


interface ITopProductCardScreenProps {
    bg_img: string,
    product_name: string,
    weekly_sales: number,
}



const TopProductCardScreen: React.FC<ITopProductCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={TopProductCardStyleSheet.classes.root}>
                <div className="top-products-wrapper">
                    <div className="top-product-card">
                        <div className={"top-product-card-bg"} style={{background: `url(${cdn(props.bg_img)}`}}> </div>
                        <div className="topProducts-card-info">
                            <div className="product-name">{props.product_name}</div>
                            <div className="weekly-sales">
                                Total Sales - <span className="">{props.weekly_sales} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { TopProductCardScreen };
