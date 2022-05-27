export interface IBookingFoodList {
    id: number | null,
    uuid: string | null,
    code: string | null,
    booking_uuid: string | null,
    food_category_uuid: string | null,
    food_uuid: string | null,
    food_name: string | null,
    category_name: string | null,
    price: number | string,
    quantity: number | string,
    total_price: number | string,
    status: 'Pending' | 'Inprogress' | 'Ready' | 'Served',
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
}