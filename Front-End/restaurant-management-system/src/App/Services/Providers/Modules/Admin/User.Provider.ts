import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import {IUser} from "@/App/Interfaces/Models";

export class UserProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static getUsersForGrid(rowsPerPage: number, currentPage: number, search: string, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/users", {prefix: "grid"}),
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

    public static getUsersNoLimit(search: string, callback: ((data: IUser[]) => any) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/users", {prefix: "dropdown"}),
            {},
            {search_query: search},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }

    public static saveUser(formData: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/user", {prefix: "save"}),
            {},
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }

    public static deleteUser(uuid: any, callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("delete", adminRoute("/user", {prefix: "delete"}),
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

    public static getTotalUsersCounted(callback: ((data: any) => void) | undefined = undefined): void {
        HttpRequestProvider.send("get", adminRoute("/total-users", {prefix: "dashboard-counter"}),
            {},
            {},
            (data: any) => {
                if (callback) {
                    callback(data.data);
                }
            });
    }
}
