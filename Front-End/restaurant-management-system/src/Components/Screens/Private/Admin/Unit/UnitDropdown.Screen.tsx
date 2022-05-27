import React, {Fragment, ReactElement} from 'react';
import {SelectMenu, Button} from 'evergreen-ui'
import {IUnit} from "@/App/Interfaces/Models";
import { UnitProvider} from "@/App/Services/Providers/Modules/Admin";
import {uid} from "@/App/Functions/Custom/uid.Function";
import {convertToString} from "@/App/Functions/Custom";

interface IUnitDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}

const UnitDropdownScreen: React.FC<IUnitDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [units, setUnits] = React.useState<IUnit[]>([]);

    const getUnits = (search: any = "") => {
        UnitProvider.getUnitsNoLimit(search, (data => {
            setLoaded(true);
            setUnits(data);
        }));
    };

    const getSelectedUnitName: any = () => {
        try {
            const unit = units.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof unit !== "undefined" && unit !== null) {
                return unit.name;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (unit_uuid: any) => {
        if (props.onChange) {
            props.onChange(convertToString(unit_uuid));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getUnits();
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
                title="Units"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={units.map((unit: IUnit) => ({
                    label: convertToString(unit.name),
                    value: unit.uuid,
                }))}
                selected={units.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getUnits(value)}
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
                    {getSelectedUnitName() !== "" ? getSelectedUnitName() : "Select Unit..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export {UnitDropdownScreen};
