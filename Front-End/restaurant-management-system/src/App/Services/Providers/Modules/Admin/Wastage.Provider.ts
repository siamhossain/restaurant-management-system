import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IProduct, IWastage, IWastageParticulars} from "@/App/Interfaces/Models";

export class WastageProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getWastagesForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/wastages", {prefix: "grid"}),
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

    public static getWastagesNoLimit(search: string, callback: ((data: IWastage[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/wastages", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(product_uuid: IProduct['uuid'], callback: ((data: IWastageParticulars[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/wastage-generate-particulars"),
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

    public static saveWastage(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/wastage", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteWastage(uuid: any, callback: ((data: any) => void) | undefined = undefined): void{
        HttpRequestProvider.send("delete", adminRoute("/wastage", {prefix: "delete"}),
            {},
            {
                uuid,
            },
            (data: any) => {
                if (callback){
                    callback(data);
                }
            });
    }
}