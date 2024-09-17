import dotenv from "dotenv";
dotenv.config();

export const config = {
    EXPRESS_PORT: process.env.EXPRESSPORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    BASE_URL: `http://localhost:${process.env.EXPRESSPORT || 3000}`,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    ORIGIN: ["https://fakenews-eta.vercel.app"],
};
