import React, { Fragment, ReactElement } from 'react';
import {IIngredient} from "@/App/Interfaces/Models";
import {IIngredientViewState} from "@/Views/Private/Admin/Ingredient/Ingredient.View";
import {InputChangeEvent} from "@/App/Types/Core";
import {css} from "@emotion/css";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {convertToString} from "@/App/Functions/Custom";
import {ImagePreviewProvider} from "@/App/Services/Providers/Global/ImagePreview";
import {Grid, IconButton} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import {Badge, Dialog, Select, Textarea, TextInputField} from "evergreen-ui";
import {CategoryDropdownScreen} from "@/Components/Screens/Private/Admin/Category";
import {BrandDropdownScreen} from "@/Components/Screens/Private/Admin/Brand/BrandDropdown.Screen";
import {convertToSlug} from "@/App/Functions/Custom/convertToSlug.Function";
import {UnitDropdownScreen} from "@/Components/Screens/Private/Admin/Unit";
import {convertToNumber} from "@/App/Functions/Custom";
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {IngredientCategoryDropdownScreen} from "@/Components/Screens/Private/Admin/IngredientCategory";

interface IIngredientFormScreenProps {
    formData: IIngredientViewState['form'],
    gridData: IIngredientViewState['grid'],

    onFormStateChange(state: { [k in keyof (IIngredientViewState)['form']]?: (IIngredientViewState)['form'][k] }, callback?: undefined | (() => void)): void,

    onFormSubmit(): void,

    onFormClose(): void,

    onSKUExistenceCheck(sku: IIngredient['sku']): void,

    onFormCloseDataReload(): void,

    onCheckSlug?(): void,
}
const IngredientFormScreen: React.FC<IIngredientFormScreenProps> = (props): ReactElement => {
    const FeaturedImagePicker = ({onPick, value}: { onPick?(e: InputChangeEvent): void, value?: any }) => (
        <label className={css`position: relative;`}>
            <input type={"file"} className={css`position: absolute; width: 0;`} onChange={onPick}/>
            <div
                className={css`height: 220px; border: 2px dashed #a6a6a6; position: relative; border-radius: 10px; cursor: pointer;`}>
                <div
                    className={css`position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; background: url(${cdn(value)}); background-size: cover; background-repeat: no-repeat; background-position: center; border-radius: 10px; display: flex; justify-content: center; align-items: center; :hover {span {display: inline-block;}}`}>
                    <span
                        className={css`display: ${convertToString(value) === "" ? "inline-block" : "none"}; padding: 6px 10px; border-radius: 5px; cursor: pointer; background: rgba(0,0,0,0.36); color: #ffffff; :hover {opacity: 0.8}`}>Change</span>
                </div>
            </div>
        </label>
    );

    const ProductMedia = {
        Media: ({uri, index}: { uri?: any, index: number }) => (
            <div className={css`display: inline-block; :hover {.make-featured {display: block}}`}>
                <div
                    className={css`display: inline-block; height: 70px; width: 70px; position: relative; border-radius: 10px; cursor: pointer; background-position: center !important; background-size: cover !important; background-repeat: no-repeat !important; background: url(${cdn(uri)})`}
                    onClick={(e: any) => {
                        ImagePreviewProvider.openByUri(cdn(uri));
                    }}>
            <span className={css` position: absolute; right: -10px; top: -10px; `}>
                <IconButton size={"small"}>
                <CancelIcon style={{fontSize: 18}} onClick={(e: any) => {
                    e.stopPropagation();

                    const ingredient_media = props.formData.media;
                    ingredient_media.splice(index, 1);
                    props.onFormStateChange({
                        media: ingredient_media
                    });
                }}/>
            </IconButton>
            </span>
                </div>

                <div
                    className={css`text-align: center; font-size: 12px; color: #0088ff; cursor: pointer; display: none` + " make-featured"}
                    onClick={() => props.onFormStateChange({
                        featured_image_uri: uri
                    })}>
                    Featured?
                </div>
            </div>
        ),
        ImagePicker: ({onChange}: { onChange?: any }) => (
            <label style={{position: "relative"}}>
                <input style={{position: "absolute", width: 0}} type={"file"} onChange={onChange}/>
                <div
                    className={css`display: inline-block; height: 70px; width: 70px; position: relative; border-radius: 10px; cursor: pointer; background: #eeeeee; :hover {background: #dddddd;}`}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>
                        <AddToPhotosIcon style={{fontSize: 30}}/>
                    </div>
                </div>
            </label>
        ),
    };
    return (
        <Fragment>
            <Dialog
                preventBodyScrolling={true}
                isShown={props.formData.open}
                title="Ingredient Entry"
                confirmLabel="Save"
                isConfirmLoading={props.formData.is_uploading || props.formData.is_slug_suggestions_loading || props.formData.is_sku_checkpoint_loading}
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={() => {
                    props.onFormSubmit();
                }}
                onCloseComplete={() => {
                    props.onFormClose();
                    props.onFormCloseDataReload();
                    props.onFormStateChange({
                        media: [],
                    });

                }}
                width={1000}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={8}>
                        <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                                <div style={{
                                    color: "#101840",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginBottom: '5px'
                                }}>Select
                                    Category
                                </div>
                                <IngredientCategoryDropdownScreen
                                    width={'100%'}
                                    uuid={convertToString(props.formData.category_uuid)}
                                    onChange={(uuid) => props.onFormStateChange({category_uuid: convertToString(uuid)})}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextInputField
                                    label="Ingredient Title"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            title: e.target.value,
                                            slug: convertToSlug(e.target.value),
                                        }, props.onCheckSlug);
                                    }}
                                    value={convertToString(props.formData.title)}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
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
                                        <span
                                            style={{color: "#7c7c7c", fontSize: 14, marginRight: 10}}>Suggestion:</span>

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

                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <div style={{
                                    color: "#101840",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginBottom: '5px'
                                }}>
                                    Select Unit
                                </div>
                                <UnitDropdownScreen
                                    width={'100%'}
                                    onChange={(uuid) => props.onFormStateChange({unit_uuid: convertToString(uuid)})}
                                    uuid={convertToString(props.formData.unit_uuid)}
                                />

                            </Grid>

                            <Grid item lg={4} sm={4} xs={12}>
                                <div
                                    className={css`input {color: ${props.formData.sku_exists ? "#D14343" : "auto"}`}>
                                    <TextInputField
                                        label="SKU"
                                        isInvalid={props.formData.sku_exists}
                                        onChange={(e: InputChangeEvent) => {
                                            const value = convertToString(e.target.value);
                                            props.onFormStateChange({
                                                sku: value,
                                            }, () => props.onSKUExistenceCheck(value));
                                        }}
                                        value={convertToString(props.formData.sku)}
                                    />
                                </div>
                            </Grid>

                            <Grid item lg={4} sm={4} xs={12}>
                                <TextInputField
                                    label="Purchase Price"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            purchase_price: e.target.value,
                                        });
                                    }}
                                    value={props.formData.purchase_price}
                                />
                            </Grid>

                            <Grid item lg={4} sm={4} xs={12}>
                                <TextInputField
                                    label="Min Stock"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            min_stock: convertToNumber(e.target.value),
                                        });
                                    }}
                                    value={convertToNumber(props.formData.min_stock)}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Description</div>
                                <Textarea
                                    value={convertToString(props.formData.description)}
                                    onChange={(event: any) => props.onFormStateChange({description: event.target.value})}
                                    width={"100%"}/>
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextInputField
                                    label="Barcode"

                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            barcode: convertToString(e.target.value),
                                        });
                                    }}
                                    value={convertToString(props.formData.barcode)}
                                />
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <div style={{
                                    color: "#101840",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginBottom: '5px'
                                }}>Status
                                </div>
                                <Select
                                    value={props.formData.status}
                                    onChange={(event: any) => props.onFormStateChange({status: event.target.value})}
                                    width={"100%"}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Select>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} xs={12} lg={12} md={12}>
                                <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: '5px'}}>
                                    <span>Featured Image</span>{" "}
                                    {convertToString(props.formData.featured_image_uri) !== "" && (
                                        <>(<span style={{color: "red", cursor: "pointer"}}
                                                 onClick={() => props.onFormStateChange({featured_image_uri: ""})}>Clear</span>)</>
                                    )}
                                </div>
                                <FeaturedImagePicker
                                    value={props.formData.featured_image_uri}
                                    onPick={(e) => {
                                        if (e.target.files !== null) {
                                            props.onFormStateChange({
                                                is_uploading: true,
                                            });
                                            UploaderProvider.upload("ingredient", e.target.files[0], ({data}) => {
                                                props.onFormStateChange({
                                                    featured_image_uri: data.path,
                                                    is_uploading: false,
                                                });
                                            });
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} lg={12}>
                                <div style={{
                                    color: "#101840",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginBottom: '5px'
                                }}>Product Media
                                </div>
                                <Grid container spacing={3}>
                                    {props.formData.media.length > 0 && props.formData.media.map((uri, index) => (
                                        <Grid item lg={3} sm={3} xs={12} style={{textAlign: "center"}} key={index}>
                                            <ProductMedia.Media uri={uri} index={index}/>
                                        </Grid>
                                    ))}

                                    <Grid item lg={3} sm={3} xs={12}>
                                        <ProductMedia.ImagePicker onChange={(e: InputChangeEvent) => {
                                            if (e.target.files !== null) {
                                                props.onFormStateChange({
                                                    is_uploading: true,
                                                });
                                                UploaderProvider.upload("ingredient", e.target.files[0], (data) => {
                                                    const media_path: string = data.data.path;
                                                    const ingredient_media = props.formData.media;
                                                    ingredient_media.push(media_path);
                                                    props.onFormStateChange({
                                                        media: ingredient_media,
                                                    }, () => {
                                                        props.onFormStateChange({
                                                            is_uploading: false,
                                                        });
                                                    });
                                                });
                                            }
                                        }}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} xs={12} lg={12} md={12}>
                                <TextInputField
                                    label="Featured Video (ID)"
                                    onChange={(e: InputChangeEvent) => {
                                        props.onFormStateChange({
                                            featured_video_id: convertToString(e.target.value),
                                        });
                                    }}
                                    value={convertToString(props.formData.featured_video_id)}
                                />

                                {convertToString(props.formData.featured_video_id) !== "" && (
                                    <iframe
                                        style={{borderRadius: 10}}
                                        width="100%" height="170"
                                        src={`https://www.youtube.com/embed/${props.formData.featured_video_id}`}
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { IngredientFormScreen };
