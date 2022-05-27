import React, { Fragment, ReactElement } from 'react';
import {ElementorElementStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ElementorElement";
import IngredientsIcon from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/our team/Professional-Chefs.png";
import CountUp from 'react-countup';

interface IElementorElementScreenProps {
    src: string,
    title: string
    count_num: number,

}

const ElementorElementScreen: React.FC <IElementorElementScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={ElementorElementStyleSheet.classes.root}>
                <div className={"elementor-container"}>
                    <div className="elementor-widget-wrap">
                        <div className="counter-icon">
                            <img src={props.src} alt=""/>
                        </div>
                        <div className="counter-title">
                            <p>{props.title}</p>
                        </div>
                        <div className="counter">
                            <CountUp
                                start={0}
                                end={props.count_num}
                                duration={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ElementorElementScreen };
