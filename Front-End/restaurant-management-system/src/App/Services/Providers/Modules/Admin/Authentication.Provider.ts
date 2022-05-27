import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";

export class AuthenticationProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static attempt(username: any, password: any, callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/auth/login"), {}, {
            username, password,
        }, (data: any) => {
            if (callback) {
                callback(data);
            }
        });
    }

    public static logout(callback: ((data: any) => any) | undefined = undefined): void {
        HttpRequestProvider.send("post", adminRoute("/auth/logout"), {}, {}, (data: any) => {
            if (callback) {
                callback(data);
            }
        });
    }
}
