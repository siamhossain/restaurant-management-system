import React, { Fragment, ReactElement } from 'react';
import {ChefCardStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ChefCard";

interface IChefCardScreenProps {
    src: string,
    name: string,
    designation: string,
    details: string,
}

const ChefCardScreen:React.FC<IChefCardScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={ChefCardStyleSheet.classes.root}>
                <div className="chef-card-container">
                    <div className="chef-card-bg" style={{ background: "url(" + props.src + ")" }}> </div>
                    <div className="chef-card-info">
                        <h2 className={"name"}>{props.name}</h2>
                        <h5 className={"designation"}>{props.designation}</h5>
                        <p className={"details"}>{props.details}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { ChefCardScreen };
