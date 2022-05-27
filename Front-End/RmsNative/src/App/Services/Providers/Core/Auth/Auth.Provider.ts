/*
 * Copyright (c) 2021, eDorpon, PlutoLien Interactive Ltd, Inc - All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mohammed Nayeem <chiefnayeem@gmail.com>
 */

import {IAuthProvider} from "./Auth.Provider.d";
import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {PrepareNamespace} from "@/App/Functions/Core";
import {PackageConfig} from "@/App/Config/Package";
import {StorageProvider} from "@/App/Services/Providers/Core/Storage";

export class AuthProvider extends ServiceProvider implements Required<IAuthProvider> {
    protected key: string;

    public constructor() {
        super();
        this.key = PrepareNamespace(PackageConfig.PackageCode, "token", ".");
    }

    public async initAuthState(callback: ((data: any) => void) | undefined = undefined, fetchUserDataOnly: boolean = false): Promise<any> {
        const token = await StorageProvider.get(this.key);
        const isLoggedIn = token !== '' && token !== null && typeof token !== 'undefined';

        //Set Auth User to the Global State
        //Call other api to get auth user data from server
        //Call other actions here
    }

    public set(token: string, callback: (() => void) | undefined = undefined) {
        StorageProvider.store(this.key, token, false).then(() => {
            if (callback) {
                callback();
            }
        });
    }

    public check() {
        const token: string = ''; //get token
        return token !== '' && token !== null && typeof token !== 'undefined';
    }

    public getToken() {
        return ''; //get the token here
    }

    public remove() {
        StorageProvider.remove(this.key).then(() => {
            //Call other action like remove auth status from global state
        });
    }
}
