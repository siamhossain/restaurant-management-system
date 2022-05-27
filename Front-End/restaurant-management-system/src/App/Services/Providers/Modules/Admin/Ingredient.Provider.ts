import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {ICategory, IIngredient} from "@/App/Interfaces/Models";

export class IngredientProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getIngredientsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredients", {prefix: "grid"}),
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

    public static getIngredientsNoLimit(search: string, callback: ((data: IIngredient[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredients", {prefix: "dropdown"}),
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

    public static getIngredientsForPos(search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredients-for-pos"),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getTotalStock(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-stock", {prefix: "grid"}),
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

    /**
     * Check the slug existence and get the recommended slugs
     * @param data {any}
     * @param callback {function}
     */
    public static checkSlug(data: { uuid?: IIngredient['uuid'], slug: IIngredient['slug'] }, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient", {prefix: "slug-checkpoint"}),
            {},
            {uuid: data.uuid, slug: data.slug},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    /**
     * Check the ingredient sku duplicate entry
     * @param data
     * @param callback {function}
     */
    public static checkSKU(data: { uuid: IIngredient['uuid'], sku: IIngredient['sku'] }, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sku", {prefix: "duplicate-checkpoint"}),
            {},
            {
                uuid: data.uuid,
                sku: data.sku?.trim(),
            },
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveIngredient(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/ingredient", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteIngredient(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/ingredient", {prefix: "delete"}),
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

    public static getTotalIngredientsCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-ingredients", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
