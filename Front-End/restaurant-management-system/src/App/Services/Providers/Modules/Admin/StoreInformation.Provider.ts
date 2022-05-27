import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {adminRoute, storeFrontRoute} from "@/App/Functions/Custom";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {IStoreInformation} from "@/App/Interfaces/Models";

export class StoreInformationProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getStoreInformation(callback: ((data: IStoreInformation) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", storeFrontRoute("/store-information"),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveStoreInformation(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/store-information"),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static getDivisions(callback: ((data: any[]) => any) | undefined = undefined) : void{
        HttpRequestProvider.send('get', adminRoute('/divisions'),
            {},
            {},
            (data:any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getDistricts(division_id: any, callback: ((data: any[]) => any) | undefined = undefined) : void{
        HttpRequestProvider.send('get', adminRoute('/districts'),
            {},
            {division_id},
            (data:any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static getUpazilas(district_id: any, callback: ((data: any[]) => any) | undefined = undefined) : void{
        HttpRequestProvider.send('get', adminRoute('/upazilas'),
            {},
            {district_id},
            (data:any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
