import React, { Fragment, ReactElement } from 'react';
import {ISocialLinkViewState} from "@/Views/Private/Admin/SocialLink/SocialLink.View";
import {InputChangeEvent} from "@/App/Types/Core";
import {Dialog, FilePicker, Spinner, TextInputField} from 'evergreen-ui';
import {Grid} from "@material-ui/core";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {convertToString} from "@/App/Functions/Custom";
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {css} from "@emotion/css";
interface ISocialLinkFormScreenProps {
    formData: ISocialLinkViewState['form'],

    onFormStateChange(state: { [k in keyof (ISocialLinkViewState)['form']]?: (ISocialLinkViewState)['form'][k] }): void,

    onFormSubmit(): void,

    onFormClose(): void,
}
const SocialLinkFormScreen: React.FC<ISocialLinkFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Social Entry"
                confirmLabel="Save"
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
            >

                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        <TextInputField
                            label="Name"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    name: e.target.value,
                                });
                            }}
                            value={props.formData.name}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <div style={{color: "#101840", fontSize: 14, fontWeight: 500}}>Select Icon</div>
                        <div className={css`input {width: 100% !important;}`}>
                            <FilePicker
                                onChange={files => {
                                    props.onFormStateChange({is_uploading: true, icon_uri: ''});
                                    UploaderProvider.upload("social", files[0], (data: any) => {
                                        props.onFormStateChange({
                                            icon_uri: data.data.path,
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

                        {convertToString(props.formData.icon_uri) !== "" && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <img src={cdn(props.formData.icon_uri)} style={{borderRadius: 5, width: 200}}
                                     alt={""}/>
                                <div>
                                    <span
                                        style={{color: "red", cursor: "pointer", fontSize: 14}}
                                        onClick={() => props.onFormStateChange({icon_uri: ""})}>
                                        Remove Icon
                                    </span>
                                </div>
                            </div>
                        )}
                    </Grid>
                    <Grid item lg={12}>
                        <TextInputField
                            label="Website URL"
                            onChange={(e: InputChangeEvent) => {
                                props.onFormStateChange({
                                    website_url: e.target.value,
                                });
                            }}
                            value={props.formData.website_url}
                        />
                    </Grid>
                </Grid>

            </Dialog>
        </Fragment>
    );
};

export { SocialLinkFormScreen };
