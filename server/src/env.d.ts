declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SESSION_SECRET: string;
    PG_USER: string;
    PG_PASSWORD: string;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID_WEB: string;
    GOOGLE_CLIENT_ID_ANDROID: string;
  }
}