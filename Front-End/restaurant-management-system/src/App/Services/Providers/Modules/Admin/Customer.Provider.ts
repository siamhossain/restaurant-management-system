import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {ICustomer} from "@/App/Interfaces/Models";
import {adminRoute} from "@/App/Functions/Custom";

export class CustomerProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getCustomersForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customers", {prefix: "grid"}),
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

    public static getCustomersNoLimit(search: string, callback: ((data: ICustomer[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customers", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveCustomer(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/customer", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteCustomer(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/customer", {prefix: "delete"}),
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

    public static getTotalCustomersCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-customers", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getCustomerInfoByUuId(uuid: ICustomer['uuid'], callback: ((data: ICustomer) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/customer-info"),
            {},
            {uuid},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}

