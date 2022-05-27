import {IWastageParticulars} from "@/App/Interfaces/Models/WastageParticulars.Interface";

export interface IWastage {
    id: number,
    uuid: string,
    code: string,
    date: string,
    total_amount: number,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    particulars?: IWastageParticulars[],
}