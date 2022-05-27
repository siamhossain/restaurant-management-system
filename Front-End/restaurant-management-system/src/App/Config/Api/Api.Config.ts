import {PrepareApiFromEnv} from "@/App/Functions/Core";

interface IApiConfig {
    APP_ROOT: string,
    API_ROOT: string,
    CDN_ROOT: string,
    REPORTS_ROOT: string,
}

export const ApiConfig: IApiConfig = {
    APP_ROOT: PrepareApiFromEnv("http://localhost:3000", "http://localhost:3000"),
    API_ROOT: PrepareApiFromEnv("http://localhost:8000/api/v1", "https://rms.edorpon.com/api/public/api/v1"),
    REPORTS_ROOT: PrepareApiFromEnv("http://localhost:8000/v1/admin/reports", "https://rms.edorpon.com/api/public/v1/admin/reports"),
    CDN_ROOT: PrepareApiFromEnv("https://edorpon-static.s3.ap-southeast-1.amazonaws.com/rms-v1", "https://edorpon-static.s3.ap-southeast-1.amazonaws.com/rms-v1"),
}
