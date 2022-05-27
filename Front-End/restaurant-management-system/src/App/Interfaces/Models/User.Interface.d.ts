import {IUserRole} from "@/App/Interfaces/Models/UserRole.Interface";

export interface IUser {
    id: number,
    uuid: string,
    code: string,
    name: string ,
    dropdown_label?: string | null,
    role_id: number ,
    username: string ,
    phone: string ,
    address: string ,
    email:  string ,
    password:  string ,
    status: "Active" | "Inactive" |  "Banned",
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    role: IUserRole
}