import {IIngredient} from "@/App/Interfaces/Models/Ingredient.Interface";

export interface IIngredientUses {
    id: number,
    uuid: string,
    code: string,
    ingredient_uuid: string,
    quantity: number,
    date: string,
    ip: string | null,
    agent: string | null,
    is_deleted: boolean | number,
    created_by_uuid: string | null,
    updated_by_uuid: string | null,
    deleted_by_uuid: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    ingredient: IIngredient,
}