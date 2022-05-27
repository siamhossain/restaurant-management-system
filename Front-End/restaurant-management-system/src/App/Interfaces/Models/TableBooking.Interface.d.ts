import {IBookingFoodList} from "@/App/Interfaces/Models/BookingFoodList.Interface";
import {ICustomer} from "@/App/Interfaces/Models/Customer.Interface";

export interface ITableBooking {
    id: number,
    uuid: string,
    code: string,
    name: string,
    email: string,
    phone: string,
    date: string,
    time: string,
    customer_uuid: string,
    person: number,
    occasion: 'Birthday' | 'Anniversary' | 'Date' | 'Special Occasion' | 'Business Meal' | 'Other',
    status: 'Placed' | 'Accept' | 'Cancel',
    message: string,
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    booking_food_list: IBookingFoodList[],
    customer: ICustomer,
}