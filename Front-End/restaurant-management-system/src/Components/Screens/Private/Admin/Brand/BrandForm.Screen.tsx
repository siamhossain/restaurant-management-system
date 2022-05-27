import React, { Fragment, ReactElement } from 'react';
import {Badge, Checkbox, Dialog, FilePicker, Select, Spinner, TextInputField} from "evergreen-ui";
import {Grid} from "@material-ui/core";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {css} from "@emotion/css";
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {IBrandViewState} from "@/Views/Private/Admin/Brand/Brand.View";
import {convertToSlug} from "@/App/Functions/Custom/convertToSlug.Function";

interface IBrandFormScreenProps {
    formData: IBrandViewState['form'],

    onFormStateChange(state: { [k in keyof (IBrandViewState)['form']]?: (IBrandViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
    onCheckSlug?(): void,
}
const BrandFormScreen: React.FC<IBrandFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Brand Entry"
                confirmLabel="Save"
                isConfirmLoading={props.formData.is_uploading || props.formData.is_slug_suggestions_loading}
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                preventBodyScrolling={true}
                onCloseComplete={() => {
                    props.onFormClose();
                }}
                width={"40%"}
            >
                <Grid container spacing={2}>
                    <Grid item sm={6}>
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
                    <Grid item sm={6}>
                        <div>
                            <TextInputField
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

                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500}}>Select Brand Logo</div>
                        <div className={css`input {width: 100% !important;}`}>
                            <FilePicker
                                onChange={files => {
                                    props.onFormStateChange({is_uploading: true, logo_uri: ''});
                                    UploaderProvider.upload("customer", files[0], (data: any) => {
                                        props.onFormStateChange({
                                            logo_uri: data.data.path,
                                            is_uploading: false,
                                        });
                                    });
                                }}
                                placeholder=""
                            />
                        </div>
                        {props.formData.is_uploading && (
                            <Spinner marginX="auto" marginY={20}/>
                        )}

                        {convertToString(props.formData.logo_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <img src={cdn(props.formData.logo_uri)} style={{borderRadius: 5, width: 200}}
                                     alt={""}/>
                                <div>
                                    <span
                                        style={{color: "red", cursor: "pointer", fontSize: 14}}
                                        onClick={() => props.onFormStateChange({logo_uri: ""})}>
                                        Remove Photo
                                    </span>
                                </div>
                            </div>
                        )}
                    </Grid>
                    <Grid item sm={6}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500,}}>Status</div>
                        <Select
                            value={props.formData.status}
                            onChange={(event: any) => props.onFormStateChange({status: event.target.value})}
                            width={"100%"}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                            <option value="Pending">Pending</option>
                        </Select>
                    </Grid>

                    <Grid item sm={6}>
                        <Checkbox
                            label="Featured"
                            checked={props.formData.is_featured}
                            onChange={e => props.onFormStateChange({is_featured: !props.formData.is_featured})}
                        />
                    </Grid>

                </Grid>
            </Dialog>
        </Fragment>
    );
};

export { BrandFormScreen };
