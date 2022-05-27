import {PackageConfig} from "@/App/Config/Package";

export function storeFrontPageTitle(title: string): string {
    return PackageConfig.PackageName + " - " + title;
}