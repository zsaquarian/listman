import dotenv from 'dotenv';

dotenv.config();
export const PORT = parseInt(process.env.PORT || '3000');
export const GOOGLE_CLIENT_ID_WEB = process.env.GOOGLE_CLIENT_ID_WEB;
export const GOOGLE_CLIENT_ID_ANDROID = process.env.GOOGLE_CLIENT_ID_ANDROID;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

export const JWT_EXPIRE_TIME = parseInt(process.env.JWT_EXPIRE_TIME);
export const REFRESH_EXPIRE_TIME = parseInt(process.env.REFRESH_EXPIRE_TIME);
