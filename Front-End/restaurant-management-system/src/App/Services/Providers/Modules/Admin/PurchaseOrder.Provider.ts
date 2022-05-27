import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IProduct, IPurchaseOrder, IPurchaseOrderParticular} from "@/App/Interfaces/Models";

export class PurchaseOrderProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getProductPurchasesForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchases", {prefix: "grid"}),
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

    public static getProductPurchasesNoLimit(search: string, callback: ((data: IPurchaseOrder) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchases", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(product_uuid: IProduct['uuid'], callback: ((data: IPurchaseOrderParticular[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/product-purchase-order-generate-particulars"),
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

    public static saveProductPurchase(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/product-purchase", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static statusUpdate(formData: any, callback: ((data: any) => void) | undefined = undefined) : void {
        HttpRequestProvider.send('post', adminRoute('/booking-status-update'),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }


    public static deleteProductPurchase(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/purchase-order", {prefix: "delete"}),
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
