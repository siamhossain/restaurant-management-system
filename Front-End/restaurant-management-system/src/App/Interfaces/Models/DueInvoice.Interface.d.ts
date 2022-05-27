import {ICustomer} from "@/App/Interfaces/Models/Customer.Interface";
import {ISupplier} from "@/App/Interfaces/Models/Supplier.Interface";

export interface IDueInvoice {
    id: number,
    uuid: string,
    code: string,
    date: string ,
    is_auto_entry: boolean ,
    participant_type: 'Customer' | 'Supplier' | "" ,
    participant_uuid: string ,
    amount: number | string ,
    comment:  string ,
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
    supplier: ISupplier,

}