import {IAccountCategory} from "@/App/Interfaces/Models/AccountCategory.Interface";

export interface IAccountHead {
    id: number,
    uuid: string,
    code: string,
    name: string,
    account_category_uuid: string,
    type: 'Income' | 'Expense',
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    account_category: IAccountCategory,
}