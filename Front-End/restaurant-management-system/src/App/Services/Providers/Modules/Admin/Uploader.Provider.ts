import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {HttpRequestProvider} from "@/App/Services/Providers/Core/HttpRequest";
import {adminRoute} from "@/App/Functions/Custom";
import { TStorageDirectory } from "@/App/Types/StorageDirectory";

export class UploaderProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static upload(storageDirectory: TStorageDirectory, file: any, callback: ((data: any) => void) | undefined = undefined): void {
        const formData: any = new FormData();
        formData.append("file", file);

        HttpRequestProvider.send("post", adminRoute("/upload?dir=" + storageDirectory, {prefix: ""}),
            {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            },
            formData,
            (data: any) => {
                if (callback) {
                    callback(data);
                }
            });
    }
}
