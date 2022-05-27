import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {ICustomer, ICustomerPayment} from "@/App/Interfaces/Models";

export class CustomerPaymentProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getCustomerPaymentsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-payments", {prefix: "grid"}),
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

    public static getCustomerPaymentsNoLimit(search: string, callback: ((data: ICustomerPayment[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-payments", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveCustomerPayment(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/customer-payment", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteCustomerPayment(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/customer-payment", {prefix: "delete"}),
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

    public static getTotalCustomerPaymentsCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-customers", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getCustomerPaymentInfoByUuId(uuid: ICustomer['uuid'], callback: ((data: ICustomerPayment) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-info"),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getCustomerDue(customer_uuid: ICustomer['uuid'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-due"),
            {},
            {customer_uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
