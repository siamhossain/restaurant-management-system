import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {ICategory, IIngredient, IIngredientUses} from "@/App/Interfaces/Models";

export class IngredientUsesProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getIngredientUsesForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-uses", {prefix: "grid"}),
            {},
            {
                RowsPerPage: rowsPerPage,
                PageNumber: currentPage,
                search_query: search,
            },
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getIngredientsUsesNoLimit(search: string, callback: ((data: IIngredient[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-uses", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getIngredientsByCategory(category_uuid: ICategory['uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-by-category"),
            {},
            {category_uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static checkTotalStock(uuid: IIngredientUses['ingredient_uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/check-ingredient-stock"),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }


    public static saveIngredientUses(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/ingredient-uses", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteIngredient(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/ingredient-uses", {prefix: "delete"}),
            {},
            {
                uuid,
            },
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

}
