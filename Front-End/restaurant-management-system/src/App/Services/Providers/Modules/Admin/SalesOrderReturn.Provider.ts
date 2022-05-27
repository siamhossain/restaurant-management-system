import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IProduct, ISalesOrderReturn, ISalesOrderReturnParticulars} from "@/App/Interfaces/Models";

export class SalesOrderReturnProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getSalesOrderReturnsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-order-returns", {prefix: "grid"}),
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

    public static getSalesOrderReturnsNoLimit(search: string, callback: ((data: ISalesOrderReturn) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-return-orders", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(product_uuid: IProduct['uuid'], callback: ((data: ISalesOrderReturnParticulars[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-order-return-generate-particulars"),
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

    public static saveSalesOrderReturn(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/sales-order-return", {prefix: "save"}),
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


    public static deleteSalesOrderReturn(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/sales-order-return", {prefix: "delete"}),
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
