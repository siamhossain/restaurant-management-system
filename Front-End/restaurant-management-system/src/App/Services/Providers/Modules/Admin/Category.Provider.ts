import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {ICategory} from "@/App/Interfaces/Models/Category.Interface";
import {adminRoute} from "@/App/Functions/Custom";

export class CategoryProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    /**
     * Get all rows paginating them securely
     * @param callback
     */
    public static getCategoriesForGrid(callback: ((data: ICategory[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/categories", {prefix: "grid"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    /**
     * Get all rows without any limit
     * @param search {string}
     * @param callback {function}
     */
    public static getCategoriesNoLimit(search: string, callback: ((data: ICategory[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/categories", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    /**
     * Get all rows without any limit
     * @param search {string}
     * @param callback {function}
     */
    public static getCategoriesByProduct(search: string, callback: ((data: ICategory[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/categories-by-product",),
            {},
            {search_query: search},
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
    public static checkSlug(data: {uuid?: ICategory['uuid'], slug: ICategory['slug']}, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/category", {prefix: "slug-checkpoint"}),
            {},
            {uuid: data.uuid, slug: data.slug},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }


    public static saveCategorySingleProperty(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/category/single-property", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static saveCategory(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/category", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteCategory(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/category", {prefix: "delete"}),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }
}
