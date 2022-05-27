import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {IAccountCategory} from "@/App/Interfaces/Models";
import {AccountCategoryProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";

interface IAccountCategoryDropdownScreenProps {
    uuid?: string,
    type: IAccountCategory['type'] | "",
    onChange?(uuid: string, label: string): void,
    width?: string | number,
    disabled?: boolean,
}
const AccountCategoryDropdownScreen: React.FC<IAccountCategoryDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [accountType, setAccountType] = React.useState<IAccountCategory['type'] | "">(props.type);
    const [categories, setCategories] = React.useState<IAccountCategory[]>([]);

    const getCategories = (search: any = "") => {
        AccountCategoryProvider.getAccountCategoriesNoLimit(props.type, search, (data => {
            setLoaded(true);
            setCategories(data);
        }));
    };

    const getSelectedCategoryName: any = () => {
        try {
            const category = categories.find(c => convertToString(c.uuid) === convertToString(props.uuid));
            if (typeof category !== "undefined" && category !== null) {
                return category.name;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (cat_uuid: any, label: any) => {
        if (props.onChange) {
            props.onChange(convertToString(cat_uuid), label);
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getCategories();
        }

        if(loaded && props.type !== accountType) {
            setAccountType(props.type);
            getCategories();
        }

        const button = document.querySelector(`#${_uid}`);
        if (typeof button !== "undefined" && button !== null) {
            setPopupWidth(button.clientWidth);
            setBootFinished(true);
        }

    }, [bootFinished, loaded, _uid, props.uuid, props.type, accountType]);

    return (
        <Fragment>
            <SelectMenu
                title="Account Category"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={categories.map((accountCategory: IAccountCategory) => ({
                    label: convertToString(accountCategory.name),
                    value: accountCategory.uuid,
                }))}
                selected={categories.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getCategories(value)}
                onSelect={(item) => {
                    if (typeof item !== "undefined") {
                        handleChange(item.value, item.label);
                    }
                }}
                closeOnSelect={true}>
                <Button
                    id={_uid}
                    textAlign={"left"}
                    width={props.width ?? props.width}
                    disabled={props.disabled}>
                    {getSelectedCategoryName() !== "" ? getSelectedCategoryName() : "Select Account Category..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};
export { AccountCategoryDropdownScreen };
