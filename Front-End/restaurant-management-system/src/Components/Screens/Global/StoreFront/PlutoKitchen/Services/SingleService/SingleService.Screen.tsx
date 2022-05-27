import React, { Fragment, ReactElement } from 'react';
import {SingleServiceStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Services";


interface IServicesScreenProps {
    src: string,
    service_heading: string,
    service_info_detail: string,
}


const SingleServiceScreen: React.FC<IServicesScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={SingleServiceStyleSheet.classes.root}>
                <div className={"service-wrapper"}>
                    <div className="service-logo">
                        <img src={props.src} alt="qualityFood"/>
                    </div>
                    <div className="single-service-info">
                        <h4>{props.service_heading}</h4>
                        <p>{props.service_info_detail}</p>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export { SingleServiceScreen };
