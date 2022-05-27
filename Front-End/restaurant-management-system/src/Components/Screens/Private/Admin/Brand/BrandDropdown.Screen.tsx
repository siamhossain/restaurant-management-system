import React, {Fragment, ReactElement} from 'react';
import {SelectMenu, Button} from 'evergreen-ui'
import {BrandProvider} from "@/App/Services/Providers/Modules/Admin";
import {IBrand} from "@/App/Interfaces/Models";
import {uid} from "@/App/Functions/Custom/uid.Function";
import {convertToString} from "@/App/Functions/Custom";

interface IBrandDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}

const BrandDropdownScreen: React.FC<IBrandDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [brands, setBrands] = React.useState<IBrand[]>([]);

    const getBrands = (search: any = "") => {
        BrandProvider.getBrandsNoLimit(search, (data => {
            setLoaded(true);
            setBrands(data);
        }));
    };

    const getSelectedBrandName: any = () => {
        try {
            const brand = brands.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof brand !== "undefined" && brand !== null) {
                return brand.name;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (brand_uuid: any) => {
        if (props.onChange) {
            props.onChange(convertToString(brand_uuid));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getBrands();
        }

        const button = document.querySelector(`#${_uid}`);
        if (typeof button !== "undefined" && button !== null) {
            setPopupWidth(button.clientWidth);
            setBootFinished(true);
        }

    }, [bootFinished, loaded, _uid, props.uuid]);

    return (
        <Fragment>
            <SelectMenu
                title="Brands"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={brands.map((brand: IBrand) => ({
                    label: convertToString(brand.name),
                    value: brand.uuid,
                }))}
                selected={brands.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getBrands(value)}
                onSelect={(item) => {
                    if (typeof item !== "undefined") {
                        handleChange(item.value);
                    }
                }}
                closeOnSelect={true}>
                <Button
                    id={_uid}
                    textAlign={"left"}
                    width={props.width ?? props.width}>
                    {getSelectedBrandName() !== "" ? getSelectedBrandName() : "Select Brand..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export {BrandDropdownScreen};
