import React, {Fragment, ReactElement} from 'react';
import {MagnifyStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Magnify";




interface IMagnifyScreenProps {
    imageSource: string,
    height?: number | string,
    width?: number | string,
    containerStyle?: React.CSSProperties,
    magnifierContainerStyle?: React.CSSProperties,

    containerProps?: {},
    previewContainerProps?: {
        imageZoomSize?: number | string,
        imageZoomTransition?: number,
    }
}

const MagnifyScreen: React.FC<IMagnifyScreenProps> = (props): ReactElement => {
    const height = props?.height ? props.height : 400;
    const width = props?.width ? props.width : 400;

    const imageZoomSize = props.previewContainerProps?.imageZoomSize ? props.previewContainerProps.imageZoomSize : 800;
    const imageZoomTransition = props.previewContainerProps?.imageZoomTransition ? props.previewContainerProps.imageZoomTransition : 0;

    const magnifierRef = React.useRef<HTMLDivElement>(null);
    const [backgroundPosition, setBackgroundPosition] = React.useState('100% 100%');

    const handleMouseMove = (e: React.MouseEvent) => {
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;

        const offsetWidth = magnifierRef.current !== null ? magnifierRef.current.offsetWidth : 0;
        const offsetHeight = magnifierRef.current !== null ? magnifierRef.current.offsetHeight : 0;

        const x = offsetX / offsetWidth * 100;
        const y = offsetY / offsetHeight * 100;

        setBackgroundPosition(x + '% ' + y + '%');
    };

    React.useEffect(() => {

    })


    return (
        <Fragment>
            <div className={MagnifyStyleSheet.classes.root}>
                <div className={"container"}>
                    <div
                        ref={magnifierRef}
                        className={"main-image-wrapper"}
                        style={{
                            background: `url(${props.imageSource})`,
                            height,
                            width,
                            ...props.containerStyle,
                        }} onMouseMove={handleMouseMove}>
                        <div className={"zoom-clone-image-wrapper"} style={{
                            transition: `all ${imageZoomTransition}s`,
                            background: `url(${props.imageSource})`,
                            backgroundSize: imageZoomSize,
                            backgroundPosition,
                            height,
                            width,
                            ...props.magnifierContainerStyle,
                        }}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export {MagnifyScreen};
