import {IAuthProvider} from "./Auth.Provider.d";
import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider/ServiceProvider";
import {PrepareNamespace} from "@/App/Functions/Core";
import {PackageConfig} from "@/App/Config/Package";
import {TAuthGuard} from "@/App/Types/Auth";

export class AuthProvider extends ServiceProvider implements Required<IAuthProvider> {
    protected key: string;
    protected LS: typeof window.localStorage;
    protected guard: TAuthGuard;

    public constructor(guard: TAuthGuard = "admin") {
        super();
        this.LS = window.localStorage;
        this.guard = guard;
        this.key = PrepareNamespace(PackageConfig.PackageCode, "token_" + guard, ".");
    }

    public set(token: string) {
        this.LS.setItem(this.key, token);
    }

    public check() {
        const token: string | null | undefined = this.LS.getItem(this.key);
        return typeof token !== 'undefined' && token !== '' && token !== null;
    }

    public getToken() {
        return this.LS.getItem(this.key);
    }

    public remove() {
        this.LS.removeItem(this.key);
    }
}
