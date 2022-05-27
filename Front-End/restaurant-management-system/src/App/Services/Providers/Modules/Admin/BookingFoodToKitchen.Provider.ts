import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IBookingFoodList} from "@/App/Interfaces/Models";

export class BookingFoodToKitchenProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getTableBookingsForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/table-booking-for-kitchen", {prefix: "grid"}),
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

    public static foodStatusUpdate(uuid: IBookingFoodList['uuid'], status: IBookingFoodList['status'], callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send('post', adminRoute('/food-status-update', {prefix: "save"}),
            {},
            {uuid,status},
            (data: any) => {
                if (callback) {
                    callback(data)
                }
            });
    }


}