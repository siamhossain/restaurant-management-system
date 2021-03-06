import {ICustomer} from "@/App/Interfaces/Models/Customer.Interface";
import {ISalesOrderReturnParticulars} from "@/App/Interfaces/Models/SalesOrderReturnParticulars.Interface";

export interface ISalesOrderReturn {
    id: number,
    uuid: string,
    code: string,
    customer_uuid: string,
    date: string,
    total_amount: number,
    discount: number,
    payable_amount: number,
    received_amount: number,
    return_amount: number,
    due_amount: number,
    paid_amount: number,
    vat: number,
    tax: number,
    payment_type: 'Cash' | 'Credit',
    status: "Active" | "Inactive" | "Pending",
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    customer: ICustomer,
    particulars: ISalesOrderReturnParticulars[],
}