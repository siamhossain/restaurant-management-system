import {ICategory} from "@/App/Interfaces/Models/Category.Interface";
import {IBrand} from "@/App/Interfaces/Models/Brand.Interface";
import {IUnit} from "@/App/Interfaces/Models/Unit.Interface";

export interface IProduct {
    id: number,
    uuid: string,
    code: string,
    title: string | null,
    slug: string | null,
    sku: string | null,
    barcode: string | null,
    category_uuid: string | null,
    brand_uuid: string | null,
    unit_uuid: string | null,
    description: string | null,
    featured_video_id: string | null,
    featured_image_uri: string | null,
    purchase_price: number | string,
    sales_price: number | string,
    vat: number | string,
    tax: number | string,
    min_stock: number | string,
    total_stock: number | string,
    total_rating_count: number | string,
    total_review_count: number | string,
    status: "Active" | "Inactive",
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    category: ICategory,
    brand: IBrand,
    unit: IUnit,
    media: any[],
    stock?: number
}