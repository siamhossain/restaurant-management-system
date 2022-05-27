export class ServiceProvider {
    constructor() {
        this.initialize();
    }

    /**
     * This is the initializer method to initialize the service provider
     * Can be destroyed by calling the destroy method
     */
    public initialize(): void {
    }

    /**
     * This will destroy the service
     * Can be started again by calling the initializer
     */
    public destroy(): void {
    }
}