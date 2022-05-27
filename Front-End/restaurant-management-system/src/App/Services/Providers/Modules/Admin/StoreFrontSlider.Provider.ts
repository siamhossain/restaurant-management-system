import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IStoreFrontSlider} from "@/App/Interfaces/Models";

export class StoreFrontSliderProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getStoreFrontSlidesForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/store-front-sliders", {prefix: "grid"}),
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

    public static getStoreFrontSlidesNoLimit(search: string, callback: ((data: IStoreFrontSlider[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/store-front/sliders", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveStoreFrontSlide(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/store-front-slider", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteStoreFrontSlide(uuid: any, callback: ((data: any) => void) | undefined = undefined): void{
        HttpRequestProvider.send("delete", adminRoute("/store-front-slider", {prefix: "delete"}),
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
