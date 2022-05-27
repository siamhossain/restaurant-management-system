import { StoreProvider as Store } from '@/App/Services/Providers/Core/WaterTank';
import { actionTypes } from "@/App/WaterTank/Actions/Global/ImagePreview";

export interface IImagePreviewStoreState {
    open: boolean,
    images: {source: string, caption: string}[],
    currentIndex?: number,
}
        
class ImagePreviewStore extends Store {
    protected actionTypes: typeof actionTypes = actionTypes;
    public initialState: IImagePreviewStoreState;
    public state: IImagePreviewStoreState;
    
    constructor() {
        super();
        
        this.initialState = {
            open: false,
            images: [],
            currentIndex: 0,
        };
        
        this.state = this.initialState;
    }
}

const __ImagePreviewStore = new ImagePreviewStore();
export {__ImagePreviewStore as ImagePreviewStore};