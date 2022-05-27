import React, { Fragment, ReactElement } from 'react';
import TenYearsExperiaenceImage from "@/Static/Images/StoreFront/PlutoKitchen/AboutPage/img_10years-of-experience.png"
import {ExperienceInfoStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ExperienceInfo";

const ExperienceInfoScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={ExperienceInfoStyleSheet.classes.root}>
                <div className="content-wrapper">
                    <img src={TenYearsExperiaenceImage} alt=""/>
                    <h1 className={"title"}>Best burger ideas & traditions from the whole world</h1>
                    <p className="details">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.

                        Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
                        fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat.
                    </p>
                    <button>Contact Us</button>
                </div>
            </div>
        </Fragment>
    );
};

export { ExperienceInfoScreen };
