export interface IAuthProvider {
    set(token: string): void | boolean;
    check(): boolean;
    getToken(): string;
    remove(): void | boolean;
}
