import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IAccountingHistory} from "@/App/Interfaces/Models";

export class AccountingHistoryProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getAccountingHistoryForGrid(rowsPerPage: number, currentPage: number, search: string, type: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/accounting-histories", {prefix: "grid"}),
            {},
            {
                RowsPerPage: rowsPerPage,
                PageNumber: currentPage,
                search_query: search,
                type: type
            },
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getAccountingHistoryNoLimit(search: string, callback: ((data: IAccountingHistory[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/accounting-histories", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }


    public static saveAccountingHistory(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/accounting-history", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteAccountingHistory(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/accounting-history", {prefix: "delete"}),
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

    public static getTotalAccountingHistoriesCounted(type: IAccountingHistory['type'], callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-accounting-history", {prefix: "dashboard-counter"}),
            {},
            {type},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
