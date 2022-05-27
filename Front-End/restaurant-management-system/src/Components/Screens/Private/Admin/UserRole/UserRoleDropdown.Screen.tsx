import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {IUserRole} from "@/App/Interfaces/Models";
import {UserRoleProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToNumber, convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";

interface IUserRoleRoleDropdownScreenProps {
    id?: number | string,
    onChange?(id: number | string): void,
    width?: string | number,
}
const UserRoleDropdownScreen: React.FC<IUserRoleRoleDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [users, setUsers] = React.useState<IUserRole[]>([]);

    const getUsers = (search: any = "") => {
        UserRoleProvider.getUserRolesNoLimit(search, (data => {
            setLoaded(true);
            setUsers(data);
        }));
    };

    const getSelectedUserName: any = () => {
        try {
            const user = users.find(b => convertToString(b.id) === convertToString(props.id));
            if (typeof user !== "undefined" && user !== null) {
                return user.title;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (user_id: any) => {
        if (props.onChange) {
            props.onChange(convertToNumber(user_id));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getUsers();
        }

        const button = document.querySelector(`#${_uid}`);
        if (typeof button !== "undefined" && button !== null) {
            setPopupWidth(button.clientWidth);
            setBootFinished(true);
        }

    }, [bootFinished, loaded, _uid, props.id]);

    return (
        <Fragment>
            <SelectMenu
                title="Users"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={users.map((user: IUserRole) => ({
                    label: convertToString(user.title),
                    value: user.id,
                }))}
                // selected={users.length > 0 ? props.id : undefined}
                onFilterChange={(value: string) => getUsers(value)}
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
                    {getSelectedUserName() !== "" ? getSelectedUserName() : "Select User Role..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};


export { UserRoleDropdownScreen };
