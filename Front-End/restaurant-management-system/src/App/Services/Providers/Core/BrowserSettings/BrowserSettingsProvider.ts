import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";

export class BrowserSettingsProvider extends ServiceProvider {
    /**
     * Set the browser tab title
     * @param title {string}
     */
    public static setTitle(title: string): void {
        document.title = title;
    }

    /**
     * Set the browser title bar favicon
     * @param imageUri {string}
     */
    public static setFavIcon(imageUri: string) {
        let favicon: any = document.querySelector('link[rel="icon"]');

        if (favicon !== null) {
            favicon.href = imageUri;
        } else {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.href = imageUri;
            document.head.appendChild(favicon);
        }
    }
}
