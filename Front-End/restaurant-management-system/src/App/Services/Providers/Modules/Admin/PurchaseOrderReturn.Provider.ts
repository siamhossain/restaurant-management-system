import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IProduct, IPurchaseOrderReturn, IPurchaseOrderReturnParticulars} from "@/App/Interfaces/Models";

export class PurchaseOrderReturnProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getProductPurchaseReturnsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchase-returns", {prefix: "grid"}),
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

    public static getProductPurchaseReturnsNoLimit(search: string, callback: ((data: IPurchaseOrderReturn) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchase-returns", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(product_uuid: IProduct['uuid'], callback: ((data: IPurchaseOrderReturnParticulars[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchase-return-order-generate-particulars"),
            {},
            {
                product_uuid,
            },
            (data: any) => {
                if (callback) {
                    callback(data.data.particulars);
                }
            });
    }

    public static saveProductPurchaseReturn(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/product-purchase-return", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }



    public static deleteProductPurchaseReturn(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/purchase-order-return", {prefix: "delete"}),
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
