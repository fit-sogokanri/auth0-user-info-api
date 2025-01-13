declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string;
        readonly ORIGIN: string;
        readonly AUTH0_ISSUER_BASE_URL: string;
        readonly AUTH0_CLIENT_ID: string;
        readonly AUTH0_SECRET: string;
        readonly AUTH0_BASE_URL: string;
        readonly DEBUG: string;
    }
}







