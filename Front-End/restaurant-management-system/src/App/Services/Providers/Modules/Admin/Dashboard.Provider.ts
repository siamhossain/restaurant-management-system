import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";

export class DashboardProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getDashboardSummary(callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/dashboard-details" ),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
    public static getTopProducts(callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/top-products" ),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }



}