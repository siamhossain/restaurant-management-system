import React, { Fragment, ReactElement } from 'react';
import {css} from "@emotion/css";
import {uid} from "@/App/Functions/Custom/uid.Function";
import {ICategory, IIngredientCategory} from "@/App/Interfaces/Models";
import {IngredientCategoryProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";

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


interface IIngredientCategoryDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string): void,
    width?: string | number,
}
const IngredientCategoryDropdownScreen: React.FC<IIngredientCategoryDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [open, setOpen] = React.useState<boolean>(false);
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [categories, setCategories] = React.useState<IIngredientCategory[]>([]);
    const [selectedCategoryName, setSelectedCategoryName] = React.useState<string | null>('');
    const [closeFired, setCloseFired] = React.useState(0);

    const getCategories = (search: any = "") => {
        IngredientCategoryProvider.getIngredientCategoriesNoLimit(search, (data => {
            setLoaded(true);
            setCategories(data);
        }));
    };

    const findCategoryObject: any = (categories: IIngredientCategory[], targetUUId: string) => {
        return categories.some(function (cat) {
            if (cat.uuid === targetUUId) {
                setSelectedCategoryName(cat.name);
                return true;
            } else if (cat.sub_categories) {
                setSelectedCategoryName('');
                return findCategoryObject(cat.sub_categories, targetUUId);
            }

            return null;
        });
    };

    const updateSelectedCategoryName = () => {
        findCategoryObject(categories, props.uuid);
    };

    const isSelected = (cat_uuid: string): boolean => {
        if(convertToString(cat_uuid) !== "" && convertToString(props.uuid) !== "") {
            return convertToString(cat_uuid) === convertToString(props.uuid);
        }

        return false;
    };

    const handleChange = (cat_uuid: string) => {
        if (props.onChange) {
            props.onChange(convertToString(cat_uuid));
            setCloseFired(0);
        }
    };


    const SubCategories: React.FC<{ categories: IIngredientCategory[] }> = (props) => {
        return (
            <React.Fragment>
                {props.categories.map((category, index) => (
                    <div key={index} style={{paddingLeft: 10}}>
                        <div
                            onClick={() => {
                                handleChange(category.uuid);
                                setOpen(false);
                            }}
                            className={__css_dropdown_item(isSelected(category.uuid))}>
                            {category.name}
                        </div>
                        {category.sub_categories.length > 0 && (
                            <SubCategories categories={category.sub_categories}/>
                        )}
                    </div>
                ))}
            </React.Fragment>
        );
    };


    const handleButtonClick = () => {
        if (!open) {
            setCloseFired(0);
        }
        setOpen(!open);
    };

    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getCategories();
        }

        updateSelectedCategoryName();

        const button = document.querySelector(`#${_uid}`);
        if (typeof button !== "undefined" && button !== null) {
            setPopupWidth(button.clientWidth);
            setBootFinished(true);

            button.addEventListener('click', handleButtonClick);

            return () => button.removeEventListener('click', handleButtonClick);
        }

    }, [bootFinished, loaded, _uid, props.uuid]);

    return (
        <Fragment>
            <SelectMenu
                isShown={open}
                title="Categories"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={categories.map((category: IIngredientCategory) => ({
                    label: convertToString(category.name),
                    value: category.uuid,
                    sub_categories: category.sub_categories,
                }))}
                onClose={() => {
                    if (closeFired === 0) {
                        setCloseFired(1);
                        return;
                    }
                    if (closeFired === 1) {
                        setCloseFired(0);
                        setOpen(false);
                    }
                }}
                itemRenderer={(props: any) => (
                    <React.Fragment key={props.key}>
                        <div onClick={props.onSelect}
                             className={__css_dropdown_item(isSelected(props.item.value))}>
                            {props.label}
                        </div>

                        <SubCategories categories={props.item.sub_categories}/>
                    </React.Fragment>
                )}
                selected={convertToString(selectedCategoryName)}
                onFilterChange={(value: string) => getCategories(value)}
                onSelect={(item) => {
                    if (typeof item !== "undefined") {
                        handleChange(convertToString(item.value));
                    }
                }}
                closeOnSelect={true}
            >
                <Button
                    id={_uid}
                    textAlign={"left"}
                    width={props.width ?? props.width}>
                    {convertToString(selectedCategoryName) !== "" ? selectedCategoryName : "Select Category..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};


export { IngredientCategoryDropdownScreen };
