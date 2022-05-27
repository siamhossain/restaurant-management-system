import React, { Fragment, ReactElement } from 'react';
import {AboutHeadlineStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/AboutHeadline";
import {ROUTE_PATHS} from "@/Routes";


interface IHeadlineBannerScreenProps {
    title: string,
    sub_title: string,
}

const HeadlineBannerScreen: React.FC<IHeadlineBannerScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <div className={AboutHeadlineStyleSheet.classes.root}>
                <div className="about-heading-container">
                    <div className="headline-bg">
                        <h1>{props.title}</h1>
                        <p><b style={{cursor: 'pointer'}} onClick={() => ROUTE_PATHS.PUBLIC.ADMIN.ROOT}>Home</b> / <span>{props.sub_title}</span></p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { HeadlineBannerScreen };
