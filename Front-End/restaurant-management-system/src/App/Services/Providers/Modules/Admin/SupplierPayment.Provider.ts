import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom/adminRoute.Function";
import {ISupplier, ISupplierPayment} from "@/App/Interfaces/Models";

export class SupplierPaymentProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getSupplierPaymentsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/supplier-payments", {prefix: "grid"}),
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

    public static getSupplierPaymentsNoLimit(search: string, callback: ((data: ISupplierPayment[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/supplier-payments", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveSupplierPayment(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/supplier-payment", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteSupplierPayment(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/supplier-payment", {prefix: "delete"}),
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

    public static getTotalSupplierPaymentsCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-suppliers", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getSupplierPaymentInfoByUuId(uuid: ISupplier['uuid'], callback: ((data: ISupplierPayment) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/supplier-info"),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getSupplierDue(supplier_uuid: ISupplier['uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/supplier-due"),
            {},
            {supplier_uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}