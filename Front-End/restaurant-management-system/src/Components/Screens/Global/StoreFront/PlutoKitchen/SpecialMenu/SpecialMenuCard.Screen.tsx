import React, { Fragment, ReactElement } from 'react';
import {SpecialMenuCardStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/SpecialMenu";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


interface ISpecialMenuCardScreenProps {
    src: string,
    menu_name: string,
    price: string,
    compare_at_price: string,
}


const SpecialMenuCardScreen: React.FC<ISpecialMenuCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={SpecialMenuCardStyleSheet.classes.root}>
                <div className="card-container">
                    <div className="card-bg" style={{background: "url(" + props.src + ")" }}> </div>
                    <div className="card-info">
                        <div className="card-menu-name">
                            {props.menu_name}
                        </div>
                        <div className="card-bottom">
                            <p className={"price"}>{props.price}</p>
                            <p className={"compare-at-price"}>{props.compare_at_price}</p>
                            <button className={"add-to-cart-btn"}><ShoppingBasketIcon/></button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { SpecialMenuCardScreen };
