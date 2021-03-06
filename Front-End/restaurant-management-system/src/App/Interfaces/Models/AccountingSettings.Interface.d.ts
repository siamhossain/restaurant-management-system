export interface IAccountingSettings {
    id: number,
    uuid: string,
    auto_accounting_entry: boolean,
    cash_sales_category_uuid: string,
    cash_sales_head_uuid: string,
    cash_purchase_category_uuid: string,
    cash_purchase_head_uuid: string,
    customer_payment_category_uuid: string,
    customer_payment_head_uuid: string,
    supplier_payment_category_uuid: string,
    supplier_payment_head_uuid: string,
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
}