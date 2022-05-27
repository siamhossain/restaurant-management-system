import {IProduct} from "@/App/Interfaces/Models/Product.Interface";
import {IWastage} from "@/App/Interfaces/Models/Wastage.Interface";

export interface IWastageParticulars {
    id: number,
    uuid: string,
    product_uuid: IProduct['uuid'],
    wastage_uuid: IWastage['uuid'],
    product_title: IProduct['title'],
    qty: number,
    unit_price: number,
    discount: number,
    total_amount: number,
}