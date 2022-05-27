import React, {Fragment, ReactElement} from 'react';
import {ImagePreviewProvider} from "@/App/Services/Providers/Global/ImagePreview";

interface ImageProps {
    alt?: string,
    src?: string,
    onClick?(): void,
    style?: React.CSSProperties,
    className?: string,
    preview?: boolean,
}

const Image: React.FC<ImageProps> = (props): ReactElement => {
    return (
        <Fragment>
            <img
                src={props.src}
                alt={props.alt}
                style={{
                    cursor: "pointer",
                    ...props.style,
                }}
                className={props.className}
                onClick={() => {
                    if(props.src && !props.preview) {
                        ImagePreviewProvider.openByUri(props.src);
                    }
                    if(props.onClick) {
                        props.onClick();
                    }
                }}
            />
        </Fragment>
    );
};

export {Image};
