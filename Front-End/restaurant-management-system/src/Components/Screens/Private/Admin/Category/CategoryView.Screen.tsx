import React from 'react';
import {Badge, Dialog} from "evergreen-ui";
import {ICategoryViewState} from "@/Views/Private/Admin/Category/Category.View";
import {Image} from "@/Components/Core/Image";
import {echo} from "@/App/Functions/Custom/echo.Function";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {cdn} from "@/App/Functions/Custom/cdn.Function";

interface ICategoryViewScreenProps {
    viewData: ICategoryViewState['view'],
    onViewClose(): void,
}

const CategoryViewScreen: React.FC<ICategoryViewScreenProps> = (props) => {
    return (
        <Dialog
            isShown={props.viewData.open}
            title="Category View"
            hasCancel={false}
            shouldCloseOnOverlayClick={true}
            confirmLabel={"Close"}
            onCloseComplete={() => props.onViewClose()}
        >
            <table style={{width: '100%', textAlign: 'left'}}>
                <tr>
                    <th>Code:</th>
                    <td>{echo(props.viewData.data?.code)}</td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td>{echo(props.viewData.data?.name)}</td>
                </tr>
                <tr>
                    <th>Slug:</th>
                    <td>{echo(props.viewData.data?.slug)}</td>
                </tr>
                <tr>
                    <th>Featured:</th>
                    <td>
                        <Badge color={convertToBoolean(props.viewData.data.is_featured) ? "purple" : "teal"}>
                            {convertToBoolean(props.viewData.data.is_featured) ? "Featured" : "Regular"}
                        </Badge>
                    </td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td>
                        {}
                        <Badge color={echo(props.viewData.data?.status) === "Active" ? "green" : "red"}>
                            {echo(props.viewData.data?.status)}
                        </Badge>
                    </td>
                </tr>
                <tr>
                    <th>Image</th>
                    <td>
                        {echo(props.viewData.data?.image_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <Image src={cdn(echo(props.viewData.data?.image_uri))} style={{borderRadius: 5, width: 200}} alt={""}/>
                            </div>
                        )}
                    </td>
                </tr>

                <tr>
                    <th>Banner</th>
                    <td>
                        {echo(props.viewData.data?.banner_image_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <Image src={cdn(echo(props.viewData.data?.banner_image_uri))} style={{borderRadius: 5, width: 200}} alt={""}/>
                            </div>
                        )}
                    </td>
                </tr>
            </table>

        </Dialog>
    );
};

export {CategoryViewScreen};
