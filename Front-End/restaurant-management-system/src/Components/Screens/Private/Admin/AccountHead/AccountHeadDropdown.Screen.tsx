import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {IAccountHead} from "@/App/Interfaces/Models";
import {AccountHeadProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";

interface IAccountHeadDropdownScreenProps {
    uuid?: string,
    type: IAccountHead['type'] | "",
    onChange?(uuid: string, label: string): void,
    width?: string | number,
    disabled?: boolean,
}
const AccountHeadDropdownScreen: React.FC<IAccountHeadDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [accountType, setAccountType] = React.useState<IAccountHead['type'] | "">(props.type);
    const [heads, setHeads] = React.useState<IAccountHead[]>([]);

    const getHeads = (search: any = "") => {
        AccountHeadProvider.getAccountHeadsNoLimit(props.type, search, (data => {
            setLoaded(true);
            setHeads(data);
        }));
    };

    const getSelectedCategoryName: any = () => {
        try {
            const category = heads.find(c => convertToString(c.uuid) === convertToString(props.uuid));
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
            getHeads();
        }

        if(loaded && props.type !== accountType) {
            setAccountType(props.type);
            getHeads();
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
                title="Account Head"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={heads.map((accountHead: IAccountHead) => ({
                    label: convertToString(accountHead.name),
                    value: accountHead.uuid,
                }))}
                selected={heads.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getHeads(value)}
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
                    {getSelectedCategoryName() !== "" ? getSelectedCategoryName() : "Select Account Head..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};
export { AccountHeadDropdownScreen };
