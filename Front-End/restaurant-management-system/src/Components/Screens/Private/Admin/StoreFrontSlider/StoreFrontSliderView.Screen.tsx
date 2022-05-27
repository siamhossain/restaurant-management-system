import React, { Fragment, ReactElement } from 'react';
import {IStoreFrontSliderViewState} from "@/Views/Private/Admin/Slider/StoreFrontSlider.View";
import {Dialog} from "evergreen-ui";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {echo} from "@/App/Functions/Custom/echo.Function";

interface IStoreFrontSliderViewScreenProps {
    viewData: IStoreFrontSliderViewState['view'],
    onViewClose(): void,
}

const StoreFrontSliderViewScreen: React.FC<IStoreFrontSliderViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Slide View"
                hasCancel={false}
                shouldCloseOnOverlayClick={true}
                confirmLabel={"Close"}
                onCloseComplete={() => props.onViewClose()}
            >
                <h4 style={{marginTop: 0}}>Slider Image</h4>
                <div style={{marginTop: 10, marginBottom: 10}}>
                    <img src={cdn(echo(props.viewData.data?.image_uri))} style={{borderRadius: 5, width: '100%', height: 250}} alt={"Slider Image"}/>
                </div>

                <h4 style={{marginTop: 15, marginBottom: 0}}>Description</h4>
                <div style={{marginTop: 10, marginBottom: 10}}>
                    {props.viewData.data?.description}
                </div>
            </Dialog>
        </Fragment>
    );
};

export { StoreFrontSliderViewScreen };
