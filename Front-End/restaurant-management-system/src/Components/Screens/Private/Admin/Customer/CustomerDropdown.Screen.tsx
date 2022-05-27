import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {ICustomer} from "@/App/Interfaces/Models";
import {CustomerProvider, UnitProvider} from "@/App/Services/Providers/Modules/Admin";
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


interface ICustomerDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}

const CustomerDropdownScreen: React.FC<ICustomerDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [customers, setCustomer] = React.useState<ICustomer[]>([]);

    const getCustomer = (search: any = "") => {
        CustomerProvider.getCustomersNoLimit(search, (data => {
            setLoaded(true);
            setCustomer(data);
        }));
    };

    const getSelectedUnitName: any = () => {
        try {
            const customer = customers.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof customer !== "undefined" && customer !== null) {
                return customer.name;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (customer_uuid: any) => {
        if (props.onChange) {
            props.onChange(convertToString(customer_uuid));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getCustomer();
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
                title="Customer"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={customers.map((customer: ICustomer) => ({
                    label: convertToString(customer.name),
                    value: customer.uuid,
                }))}
                selected={customers.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getCustomer(value)}
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
                    {getSelectedUnitName() !== "" ? getSelectedUnitName() : "Select Customer..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export { CustomerDropdownScreen };
