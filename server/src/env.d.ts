declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    PG_USER: string;
    PG_PASSWORD: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    GOOGLE_CLIENT_ID_WEB: string;
    GOOGLE_CLIENT_ID_ANDROID: string;
    CORS_ORIGIN: string;
    JWT_EXPIRE_TIME: string;
    REFRESH_EXPIRE_TIME: string;
    IN_PROD: string;
  }
}