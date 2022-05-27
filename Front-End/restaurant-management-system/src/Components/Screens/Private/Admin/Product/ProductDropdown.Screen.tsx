import React, { Fragment, ReactElement } from 'react';
import {uid} from "@/App/Functions/Custom/uid.Function";
import {IProduct} from "@/App/Interfaces/Models";
import {ProductProvider} from "@/App/Services/Providers/Modules/Admin";
import {convertToString} from "@/App/Functions/Custom";
import {Button, SelectMenu} from "evergreen-ui";
interface IProductDropdownScreenProps {
    uuid?: string,
    onChange?(uuid: string, stock: number): void,
    width?: string | number,
}
const ProductDropdownScreen: React.FC<IProductDropdownScreenProps> = (props): ReactElement => {
    const _uid = uid();
    const [popupWidth, setPopupWidth] = React.useState<any>(undefined);
    const [bootFinished, setBootFinished] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [products, setProducts] = React.useState<IProduct[]>([]);

    const getProduct = (search: any = "") => {
        ProductProvider.getProductsNoLimit(search, (data => {
            setLoaded(true);
            setProducts(data);
        }));
    };

    const getSelectedProductName: any = () => {
        try {
            const product = products.find(b => convertToString(b.uuid) === convertToString(props.uuid));
            if (typeof product !== "undefined" && product !== null) {
                return product.title;
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    const handleChange = (product_uuid: any, stock: number) => {
        if (props.onChange) {
            props.onChange(convertToString(product_uuid), stock);
        }
    };


    React.useEffect(() => {
        if (!loaded && bootFinished) {
            getProduct();
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
                title="Product"
                filterPlaceholder={"Search"}
                width={popupWidth}
                options={products.map((product: IProduct) => ({
                    label: convertToString(product.title),
                    value: product.uuid,
                    stock: product.stock,
                }))}
                selected={products.length > 0 ? props.uuid : undefined}
                onFilterChange={(value: string) => getProduct(value)}
                onSelect={(item: any) => {
                    if (typeof item !== "undefined") {
                        handleChange(item.value, item.stock);
                    }
                }}
                closeOnSelect={true}>
                <Button
                    id={_uid}
                    textAlign={"left"}
                    width={props.width ?? props.width}>
                    {getSelectedProductName() !== "" ? getSelectedProductName() : "Select Product..."}
                </Button>
            </SelectMenu>
        </Fragment>
    );
};

export { ProductDropdownScreen };
