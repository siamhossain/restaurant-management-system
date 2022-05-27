import React, { Fragment, ReactElement } from 'react';
import {Checkbox, Dialog, FilePicker, Spinner, TextInputField} from "evergreen-ui";
import {InputChangeEvent} from "@/App/Interfaces/Core/DomElements";
import {convertToString} from "@/App/Functions/Custom";
import {IStoreFrontSliderViewState} from "@/Views/Private/Admin/Slider/StoreFrontSlider.View";
import {convertToBoolean} from "@/App/Functions/Custom/convertToBoolean.Function";
import {SketchPicker} from 'react-color';
import {UploaderProvider} from "@/App/Services/Providers/Modules/Admin";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {Image} from "@/Components/Core/Image";

interface IStoreFrontSliderFormScreenProps {
    formData: IStoreFrontSliderViewState['form'],

    onFormStateChange(state: { [k in keyof (IStoreFrontSliderViewState)['form']]?: (IStoreFrontSliderViewState)['form'][k] }, callback?: (() => void) | undefined): void,

    onFormClose(): void,

    onFormSubmit(): void,
}
const StoreFrontSliderFormScreen: React.FC<IStoreFrontSliderFormScreenProps> = (props): ReactElement => {
    return (
        <Fragment>
            <Dialog
                isShown={props.formData.open}
                title="Slider Entry"
                confirmLabel="Save"
                isConfirmLoading={props.formData.is_uploading}
                intent={"success"}
                shouldCloseOnOverlayClick={false}
                onConfirm={props.onFormSubmit}
                onCloseComplete={() => props.onFormClose()}
            >

                <div style={{color: "#101840", fontSize: 14, fontWeight: 500, marginBottom: 5}}>Select Slide Image</div>
                <FilePicker
                    onChange={files => {
                        props.onFormStateChange({is_uploading: true, image_uri: ''});
                        UploaderProvider.upload("slide", files[0], (data: any) => {
                            props.onFormStateChange({
                                image_uri: data.data.path,
                                is_uploading: false,
                            });
                        });
                    }}
                    placeholder=""
                />

                {props.formData.is_uploading && (
                    <Spinner marginX="auto" marginY={20}/>
                )}

                {convertToString(props.formData.image_uri) !== "" && (
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <Image src={cdn(props.formData.image_uri)} style={{borderRadius: 5, width: '100%'}}
                               alt="Slide Image"/>
                    </div>
                )}

                <br/>
                <TextInputField
                    label="Description"
                    onChange={(e: InputChangeEvent) => {
                        props.onFormStateChange({
                            description: e.target.value,
                        });
                    }}
                    value={convertToString(props.formData.description)}
                />

                <TextInputField
                    label="Description Text Color"
                    onChange={(e: InputChangeEvent) => {
                        props.onFormStateChange({
                            description_text_color: e.target.value,
                        });
                    }}
                    onClick={() => props.onFormStateChange({description_text_color_picker_open: true})}
                    value={convertToString(props.formData.description_text_color)}
                />

                {props.formData.description_text_color_picker_open && (
                    <SketchPicker
                        color={convertToString(props.formData.description_text_color)}
                        onChange={(color) => props.onFormStateChange({
                            description_text_color: color.hex,
                        })}
                    />
                )}


                <div style={{userSelect: "none", marginTop: 25}}>
                    <Checkbox
                        label="Featured"
                        checked={convertToBoolean(props.formData.is_featured)}
                        onChange={e => props.onFormStateChange({is_featured: !props.formData.is_featured})}
                    />
                </div>
            </Dialog>
        </Fragment>
    );
};

export { StoreFrontSliderFormScreen };
