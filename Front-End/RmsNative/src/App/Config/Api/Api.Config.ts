import {PrepareApiFromEnv} from "@/App/Functions/Core";

interface IApiConfig {
    API_ROOT: string,
    CDN_ROOT: string,
}

const INTERNAL_MACHINE_SERVER = "http://10.0.2.2:8000/api/v1";
const EXTERNAL_MACHINE_SERVER = 'http://192.168.137.1:8000/api/v1';
const REMOTE_MACHINE_SERVER = 'http://chiefnayeem.com/api/v1';

export const ApiConfig: IApiConfig = {
    API_ROOT: PrepareApiFromEnv(INTERNAL_MACHINE_SERVER, REMOTE_MACHINE_SERVER),
    CDN_ROOT: PrepareApiFromEnv("https://chiefnayeem.com/cdn", "https://chiefnayeem.com/cdn"),
};
