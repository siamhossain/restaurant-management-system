import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {ISupplier} from "@/App/Interfaces/Models";
import {SupplierProvider, UnitProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";
import {css} from "@emotion/css";

const __css_dropdown_item = (selected: boolean = false) => css`
  padding: 8px 10px;
  background: ${selected ? "#eef8fd" : "#ffffff"};
  font-weight: ${selected ? "bold" : "normal"};
  outline: none;
  border-bottom: 1px solid #edeff5;
  font-size: 12px;
  font-family: "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #474d66;
  cursor: pointer;
  
  :hover {
    background: #FAFBFF;
  }
`;


interface ISupplierDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}

const SupplierDropdownScreen: React.FC<ISupplierDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [suppliers, setSupplier] = React.useState<ISupplier[]>([]);

    const getSupplier = (search: any = "") => {
        SupplierProvider.getSuppliersNoLimit(search, (data => {
            setLoaded(true);
            setSupplier(data);
        }));
    };

    const getSelectedUnitName: any = () => {
        try {
            const supplier = suppliers.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof supplier !== "undefined" && supplier !== null) {
                return supplier.full_name;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (supplier_uuid: any) => {
        if (props.onChange) {
            props.onChange(convertToString(supplier_uuid));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getSupplier();
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
                title="Supplier"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={suppliers.map((supplier: ISupplier) => ({
                    label: convertToString(supplier.full_name),
                    value: supplier.uuid,
                }))}
                selected={suppliers.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getSupplier(value)}
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
                    {getSelectedUnitName() !== "" ? getSelectedUnitName() : "Select Supplier..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export { SupplierDropdownScreen };
