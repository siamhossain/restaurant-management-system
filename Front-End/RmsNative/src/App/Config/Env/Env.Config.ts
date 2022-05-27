interface IEnv {
    Production: boolean,
    Development: boolean,
    Test: boolean,
}

export const Env: IEnv = {
    Production: process.env.NODE_ENV === "production",
    Development: process.env.NODE_ENV === "development",
    Test: process.env.NODE_ENV === "test",
};