export interface IAccountCategory {
    id: number,
    uuid: string,
    code: string,
    name: string,
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
}