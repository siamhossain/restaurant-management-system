import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {
    IProduct,
    IPurchaseOrder,
    IPurchaseOrderParticular,
    ISalesOrder,
    ISalesOrderParticulars
} from "@/App/Interfaces/Models";

export class SalesOrderProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getSalesOrdersForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-orders", {prefix: "grid"}),
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

    public static getSalesOrdersNoLimit(search: string, callback: ((data: ISalesOrder) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-orders", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(product_uuid: IProduct['uuid'], callback: ((data: ISalesOrderParticulars[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-order-generate-particulars"),
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

    public static saveSalesOrder(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/sales-order", {prefix: "save"}),
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


    public static deleteSalesOrder(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/sales-order", {prefix: "delete"}),
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
