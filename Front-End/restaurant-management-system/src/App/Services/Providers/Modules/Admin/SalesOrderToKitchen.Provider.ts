import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IBookingFoodList, ISalesOrderParticulars} from "@/App/Interfaces/Models";

export class SalesOrderToKitchenProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getTableBookingsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/sales-order-for-kitchen", {prefix: "grid"}),
            {},
            {
                RowsPerPage: rowsPerPage,
                PageNumber: currentPage,
                search_query: search,
                status: 'Active',
            },
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static foodStatusUpdate(uuid: IBookingFoodList['uuid'], status: ISalesOrderParticulars['status'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send('post', adminRoute('/sales-food-status-update', {prefix: "save"}),
            {},
            {uuid, status},
            (data: any) => {
                if (callback) {
                    callback(data)
                }
            });
    }
}