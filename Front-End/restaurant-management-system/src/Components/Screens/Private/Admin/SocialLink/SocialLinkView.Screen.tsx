import React, { Fragment, ReactElement } from 'react';
import {ISocialLinkViewState} from "@/Views/Private/Admin/SocialLink/SocialLink.View";
import {convertToString} from "@/App/Functions/Custom";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {Image} from "@/Components/Core/Image";
import {Dialog} from "evergreen-ui";
import {cdn} from "@/App/Functions/Custom/cdn.Function";

interface ISocialLinkViewScreenProps {
    viewData: ISocialLinkViewState['view'],
    onViewClose(): void,
}

const SocialLinkViewScreen: React.FC<ISocialLinkViewScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.viewData.open}
                title="Social View"
                hasCancel={false}
                confirmLabel={"Close"}
                shouldCloseOnOverlayClick={true}
                onCloseComplete={() => props.onViewClose()}
            >
                <table style={{width: '100%', textAlign: 'left'}}>
                    <tr>
                        <th>Name:</th>
                        <td>{echo(props.viewData.data?.name)}</td>
                    </tr>
                    <tr>
                        <th>Icon:</th>
                        <td>
                            {convertToString(props.viewData.data?.icon_uri) !== "" && (
                                <Image src={cdn(props.viewData.data?.icon_uri)} style={{width: 50}}/>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Website URL:</th>
                        <td><a href={props.viewData.data?.website_url} target={'_blank'}>{echo(props.viewData.data?.website_url)}</a></td>
                    </tr>
                </table>

            </Dialog>
        </Fragment>
    );
};

export { SocialLinkViewScreen };
