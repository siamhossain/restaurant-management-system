import React, {Fragment, ReactElement} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {IconButton, IconButtonProps} from '@material-ui/core';
import classNames from "classnames";
import {ICategory} from "@/App/Interfaces/Models";
import {ICategoryViewFormState} from "@/Views/Private/Admin/Category/Category.View";
import {Badge} from 'evergreen-ui';
import {Image} from "@/Components/Core/Image";
import {convertToString} from "@/App/Functions/Custom";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {CategoryTreeStyleSheet} from "@/Static/StyleSheets/Admin/CategoryTree";
import {EditableTextView} from "react-hidden-input";

interface ICategoryTreeScreenProps {
    categories: ICategory[],
    onRename?(uuid: ICategory['uuid'], name: ICategory['name']): void,
    onDelete?(uuid: ICategory['uuid']): void,
    onView(data: ICategory): any,
    onFormStateChange(state: ICategoryViewFormState): void,
}

const CategoryTreeScreen: React.FC<ICategoryTreeScreenProps> = (props): ReactElement => {
    const CategoryTree = {
        Container: (props: { children?: React.ReactNode }) => (
            <div className="treeLevelWrap">
                {props.children}
            </div>
        ),

        Item: (props: {
            children?: React.ReactNode,
            data: ICategory,
            actionButtons?: {
                icon?: React.ReactNode,
                buttonProps?: IconButtonProps,
                onClick?(): void,
                mode?: "success" | "warning" | "error" | "info",
            }[],
            onRename?(uuid: ICategory['uuid'], name: ICategory['name']): void,
        }) => (
            <div className={"treeLevel"}>
                {convertToString(props.data.image_uri) !== "" && (
                    <span>
                        <Image src={cdn(props.data.image_uri)} alt=""/>
                    </span>
                )}
                <span>
                    <EditableTextView
                        value={props.data.name}
                        onOk={((value: string) => {
                            if (typeof props.onRename !== "undefined") {
                                props.onRename(props.data.uuid, value);
                            }
                        })}
                        absoluteActionBar={true}
                    />
                </span>
                {convertToBoolean(props.data.is_featured) && (props.data.status !== "Inactive") && (
                    <span style={{verticalAlign: "middle", marginTop: 3, marginLeft: 10, marginRight: 5}}>
                        <Badge color={"purple"}>FEATURED</Badge>
                    </span>
                )}

                {props.data.status === "Inactive" && (
                    <span style={{verticalAlign: "middle", marginTop: 3, marginLeft: 10, marginRight: 5}}>
                        <Badge color={"red"}>Inactive</Badge>
                    </span>
                )}

                {props.actionButtons?.map((actionButton, index) => (
                    <IconButton
                        key={index}
                        size={"small"}
                        className={classNames({
                            "icon-button": true,
                            "success-button": actionButton.mode === "success",
                            "error-button": actionButton.mode === "error",
                            "info-button": actionButton.mode === "info",
                            "warning-button": actionButton.mode === "warning",
                        })}
                        onClick={actionButton.onClick}>
                        {actionButton.icon}
                    </IconButton>
                ))}
            </div>
        ),
    }

    const MapCategories = ({categories}: { categories: ICategory[] }) => (
        <React.Fragment>
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <CategoryTree.Item
                        data={category}
                        actionButtons={[
                            {
                                icon: <AddIcon/>,
                                onClick(): void {
                                    props.onFormStateChange({
                                        open: true,
                                        uuid: "",
                                        parent_cat_uuid: category.uuid,
                                    });
                                },
                                mode: "success",
                            },
                            {
                                icon: <VisibilityIcon/>,
                                onClick(): void {
                                    props.onView(category);
                                },
                                mode: "warning",
                            },
                            {
                                icon: <EditIcon/>,
                                onClick(): void {
                                    props.onFormStateChange({
                                        open: true,
                                        uuid: category.uuid,
                                        parent_cat_uuid: category.parent_cat_uuid,
                                        name: category.name,
                                        slug: category.slug,
                                        description: category.description,
                                        image_uri: category.image_uri,
                                        banner_image_uri: category.banner_image_uri,
                                        banner_text: category.banner_text,
                                        status: category.status,
                                        is_featured: category.is_featured,
                                    });
                                },
                                mode: "info",
                            },
                            {
                                icon: <DeleteIcon/>,
                                onClick(): void {
                                    if (typeof props.onDelete !== "undefined") {
                                        props.onDelete(category.uuid);
                                    }
                                },
                                mode: "error",
                            }
                        ]}
                        onRename={props.onRename}
                    />

                    {category.sub_categories.length > 0 && (
                        <div style={{marginLeft: 20}}>
                            <MapCategories categories={category.sub_categories}/>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </React.Fragment>
    )

    return (
        <Fragment>
            <div className={CategoryTreeStyleSheet.classes.root}>
                <CategoryTree.Container>
                    <MapCategories categories={props.categories}/>
                </CategoryTree.Container>
            </div>
        </Fragment>
    );
};

export {CategoryTreeScreen};
