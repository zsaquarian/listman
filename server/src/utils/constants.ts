import dotenv from 'dotenv';

dotenv.config();
export const PORT = parseInt(process.env.PORT || '3000');
export const GOOGLE_CLIENT_ID_WEB = process.env.GOOGLE_CLIENT_ID_WEB;
export const GOOGLE_CLIENT_ID_ANDROID = process.env.GOOGLE_CLIENT_ID_ANDROID;
export const SESSION_SECRET = process.env.SESSION_SECRET;
