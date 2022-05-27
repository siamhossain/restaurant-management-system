import {ServiceProvider} from "@/App/Services/Providers/Core/ServiceProvider";
import {cdn} from "@/App/Functions/Custom/cdn.Function";
import {SetImagePreviewStoreState} from "@/App/WaterTank/Actions/Global/ImagePreview";
import {IImagePreviewStoreState} from "@/App/WaterTank/Stores/Global/ImagePreview";
export class ImagePreviewProvider extends ServiceProvider {
    public initialize(): void {
        super.initialize();
    }

    public destroy(): void {
        super.destroy();
    }

    public static prepareImages(images: any[], pathKey: string, captionKey: string | undefined = undefined) {
        return images.map((image: any, index) => ({
            source: typeof image[pathKey] !== "undefined" ? cdn(image[pathKey]) : "",
            caption: typeof captionKey !== "undefined" && image[captionKey] !== "undefined" ? image[captionKey] : "",
        }));
    }

    public static open(images: IImagePreviewStoreState['images'], featuredImageIndex: number = 0): void {
        SetImagePreviewStoreState((state) => ({
            open: true,
            images,
            currentIndex: featuredImageIndex,
        }));
    }

    public static openByUri(uri: string, caption: string = ""): void {
        const images = [{source: uri, caption}];
        SetImagePreviewStoreState((state) => ({
            open: true,
            images,
            currentIndex: 0,
        }));
    }

    public static close(): void {
        SetImagePreviewStoreState((state) => ({
            open: false,
            images: [],
            currentIndex: 0,
        }));
    }
}