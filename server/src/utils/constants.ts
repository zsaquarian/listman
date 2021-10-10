import dotenv from 'dotenv';

dotenv.config();
export const PORT = parseInt(process.env.PORT || '3000');
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
