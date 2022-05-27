import {IAccountCategory} from "@/App/Interfaces/Models/AccountCategory.Interface";
import {IAccountHead} from "@/App/Interfaces/Models/AccountHead.Interface";

export interface IAccountingHistory {
    id: number,
    uuid: string,
    code: string,
    is_auto_entry: boolean,
    account_category_uuid: IAccountCategory['uuid'],
    account_category_name: IAccountCategory['name'],
    account_head_uuid: IAccountHead['uuid'],
    account_head_name: IAccountHead['name'],
    type: 'Income' | 'Expense',
    comment: string | null,
    total_amount: number | string,
    date: string | null,
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
    account_head: IAccountHead,
}