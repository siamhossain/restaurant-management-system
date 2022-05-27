import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IIngredient, IIngredientPurchase, IIngredientPurchaseParticular} from "@/App/Interfaces/Models";

export class IngredientPurchaseProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getIngredientPurchasesForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-purchases", {prefix: "grid"}),
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

    public static getIngredientPurchasesNoLimit(search: string, callback: ((data: IIngredientPurchase) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-purchases", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static generateAndGetParticulars(ingredient_uuid: IIngredient['uuid'], callback: ((data: IIngredientPurchaseParticular[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/ingredient-order-generate-particulars"),
            {},
            {
                ingredient_uuid,
            },
            (data: any) => {
                if (callback) {
                    callback(data.data.particulars);
                }
            });
    }

    public static saveIngredientPurchase(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/ingredient-purchase", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static statusUpdate(formData: any, callback: ((data: any) => void) | undefined = undefined) : void {
        HttpRequestProvider.send('post', adminRoute('/booking-status-update'),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }


    public static deleteIngredientPurchase(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/ingredient-purchase", {prefix: "delete"}),
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
}
