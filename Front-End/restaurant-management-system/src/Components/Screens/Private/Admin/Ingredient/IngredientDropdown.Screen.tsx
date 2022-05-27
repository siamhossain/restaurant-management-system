import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {IIngredient} from "@/App/Interfaces/Models";
import {IngredientProvider, UnitProvider} from "@/App/Services/Providers/Modules/Admin";
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


interface IIngredientDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}

const IngredientDropdownScreen: React.FC<IIngredientDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [ingredients, setIngredients] = React.useState<IIngredient[]>([]);

    const getIngredient = (search: any = "") => {
        IngredientProvider.getIngredientsNoLimit(search, (data => {
            setLoaded(true);
            setIngredients(data);
        }));
    };

    const getSelectedUnitName: any = () => {
        try {
            const ingredient = ingredients.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof ingredient !== "undefined" && ingredient !== null) {
                return ingredient.title;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (ingredient_uuid: any) => {
        if (props.onChange) {
            props.onChange(convertToString(ingredient_uuid));
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getIngredient();
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
                title="Ingredient"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={ingredients.map((ingredient: IIngredient) => ({
                    label: convertToString(ingredient.title),
                    value: ingredient.uuid,
                }))}
                selected={ingredients.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getIngredient(value)}
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
                    {getSelectedUnitName() !== "" ? getSelectedUnitName() : "Select Ingredient..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export { IngredientDropdownScreen };
