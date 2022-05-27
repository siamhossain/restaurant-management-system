import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {ICategory, IProduct} from "@/App/Interfaces/Models";

export class ProductProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getProductsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/products", {prefix: "grid"}),
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

    public static getProductsNoLimit(search: string, callback: ((data: IProduct[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/products", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getProductsByCategory(category_uuid: ICategory['uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-by-category"),
            {},
            {category_uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getProductsForPos(search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/products-for-pos"),
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
    public static checkSlug(data: { uuid?: IProduct['uuid'], slug: IProduct['slug'] }, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product", {prefix: "slug-checkpoint"}),
            {},
            {uuid: data.uuid, slug: data.slug},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    /**
     * Check the product sku duplicate entry
     * @param data
     * @param callback {function}
     */
    public static checkSKU(data: { uuid: IProduct['uuid'], sku: IProduct['sku'] }, callback: ((data: any) => any) | undefined = undefined): void {
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

    public static saveProduct(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/product", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteProduct(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/product", {prefix: "delete"}),
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

    public static getTotalProductsCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-products", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getProductTitle(uuid: IProduct['uuid'], callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product"),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
