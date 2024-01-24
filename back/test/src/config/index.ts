import { config } from 'dotenv';

config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI!;
export const SECRET = process.env.SECRET;
export const BASE_URL = process.env.BASE_URL;
