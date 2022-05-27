import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static async store(key: string, value: any, isObject: boolean = false) : Promise<any> {
        return await AsyncStorage.setItem(key, isObject ? JSON.stringify(value) : value.toString());
    }

    public static async get(key: string): Promise<any> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            throw new Error(e);
        }
    }

    public static async remove(key: string) : Promise<any> {
        try {
            return AsyncStorage.removeItem(key);
        } catch (e) {
            throw new Error(e);
        }
    }
}
