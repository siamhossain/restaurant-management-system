import React, { Fragment, ReactElement } from 'react';
import {ICategoryViewFormState, ICategoryViewState} from "@/Views/Private/Admin/Category/Category.View";
import {
    Badge, Button,
    Checkbox,
    Dialog,
    FilePicker, IconButton,
    Select,
    Spinner,
    StarEmptyIcon, StarIcon,
    Textarea,
    TextInputField
} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {CategoryDropdownScreen} from "@/Components/Screens/Private/Admin/Category";
import {convertToString} from "@/App/Functions/Custom";
import {InputChangeEvent, TextareaChangeEvent} from "@/App/Types/Core";
import {convertToSlug} from "@/App/Functions/Custom/convertToSlug.Function";
import {css} from "@emotion/css";
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {IngredientCategoryDropdownScreen} from "@/Components/Screens/Private/Admin/IngredientCategory/IngredientCategoryDropdown.Screen";

interface IIngredientCategoryFormScreenProps {
    open?: boolean,
    formData: ICategoryViewState['form'],

    onFormSubmit(): void,

    onFormClose(): void,

    onFormStateChange(state: ICategoryViewFormState, callback?: undefined | (() => void)): void,

    onCheckSlug?(): void,
}
const IngredientCategoryFormScreen: React.FC<IIngredientCategoryFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Ingredient Category Entry"
                confirmLabel="Save"
                isConfirmLoading={props.formData.is_image_uploading || props.formData.is_banner_uploading || props.formData.is_slug_suggestions_loading}
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>
                            Parent Category
                            {props.formData.parent_cat_uuid !== "" && (
                                <span style={{color: "red", cursor: "pointer", marginLeft: 10}}
                                      onClick={() => props.onFormStateChange({parent_cat_uuid: ""})}>(Clear)</span>
                            )}
                        </div>
                        <IngredientCategoryDropdownScreen
                            uuid={convertToString(props.formData.parent_cat_uuid)}
                            onChange={(uuid => props.onFormStateChange({parent_cat_uuid: uuid}))}
                            width={"100%"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextInputField
                            label="Name"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    name: e.target.value,
                                    slug: convertToSlug(e.target.value),
                                }, props.onCheckSlug);
                            }}
                            value={convertToString(props.formData.name)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                            <TextInputField
                                marginBottom={10}
                                label="Slug"
                                isInvalid={props.formData.slug_exists}
                                validationMessage={props.formData.slug_exists ? "This slug is not available!" : undefined}
                                onChange={(e: InputChangeEvent) => {
                                    props.onFormStateChange({
                                        slug: convertToSlug(e.target.value),
                                    }, props.onCheckSlug);
                                }}
                                value={convertToString(props.formData.slug)}
                            />
                        </div>
                        {props.formData.slug_exists && (
                            <div>
                                <span style={{color: "#7c7c7c", fontSize: 14, marginRight: 10}}>Suggestion:</span>

                                {props.formData.slug_suggestions.map((suggestion, index) => (
                                    <Badge
                                        key={index}
                                        cursor={"pointer"}
                                        fontWeight={"bold"}
                                        color="green"
                                        marginRight={8}
                                        textTransform={"lowercase"}
                                        onClick={() => {
                                            props.onFormStateChange({
                                                slug: convertToSlug(suggestion),
                                            }, props.onCheckSlug);
                                        }}>
                                        {suggestion}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Description
                        </div>
                        <Textarea
                            value={convertToString(props.formData.description)}
                            onChange={(e: TextareaChangeEvent) => props.onFormStateChange({description: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Image</div>
                        <div className={css`input {width: 100% !important}`}>
                            <FilePicker
                                onChange={files => {
                                    props.onFormStateChange({is_image_uploading: true, image_uri: ''});
                                    UploaderProvider.upload("category", files[0], (data: any) => {
                                        props.onFormStateChange({
                                            image_uri: data.data.path,
                                            is_image_uploading: false,
                                        });
                                    });
                                }}
                                placeholder=""
                            />
                        </div>

                        {props.formData.is_image_uploading && (
                            <Spinner marginX="auto" marginY={20}/>
                        )}

                        {convertToString(props.formData.image_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <img src={cdn(props.formData.image_uri)} style={{borderRadius: 5, width: 200}}
                                     alt={""}/>

                                <div>
                                    <span
                                        style={{color: "red", cursor: "pointer", fontSize: 14}}
                                        onClick={() => props.onFormStateChange({image_uri: ""})}>
                                        Remove Photo
                                    </span>
                                </div>
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Banner Image
                        </div>
                        <div className={css`input {width: 100% !important;}`}>
                            <FilePicker
                                onChange={files => {
                                    props.onFormStateChange({is_banner_uploading: true, banner_image_uri: ''});
                                    UploaderProvider.upload("category", files[0], (data: any) => {
                                        props.onFormStateChange({
                                            banner_image_uri: data.data.path,
                                            is_banner_uploading: false,
                                        });
                                    });
                                }}
                                placeholder=""
                            />
                        </div>

                        {props.formData.is_banner_uploading && (
                            <Spinner marginX="auto" marginY={20}/>
                        )}

                        {convertToString(props.formData.banner_image_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <img src={cdn(props.formData.banner_image_uri)} style={{borderRadius: 5, width: 200}}
                                     alt={""}/>

                                <div>
                                    <span
                                        style={{color: "red", cursor: "pointer", fontSize: 14}}
                                        onClick={() => props.onFormStateChange({banner_image_uri: ""})}>
                                        Remove Photo
                                    </span>
                                </div>
                            </div>
                        )}
                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Banner Text
                        </div>
                        <TextInputField
                            value={convertToString(props.formData.banner_text)}
                            onChange={(e: InputChangeEvent) => props.onFormStateChange({banner_text: e.target.value})}
                        />
                    </Grid>
                </Grid>


                <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginTop: 20}}>Status</div>
                <Select
                    value={props.formData.status}
                    onChange={(event: any) => props.onFormStateChange({status: event.target.value})}
                    width={"100%"}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </Select>

                <div style={{userSelect: "none", marginTop: 25}}>

                    <Checkbox
                        label="Featured"
                        checked={convertToBoolean(props.formData.is_featured)}
                        onChange={e => props.onFormStateChange({is_featured: !convertToBoolean(props.formData.is_featured)})}
                    />

                </div>
            </Dialog>
        </Fragment>
    );
};

export { IngredientCategoryFormScreen };
