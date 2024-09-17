import mongoose from "mongoose";
import { config } from "../config/index.js";

export const connectToMongo = async () => {
    console.log(config.MONGO_URI);
    if (!config.MONGO_URI) {
        throw new Error("Mongo Uri is Unavailable");
    }
    // return
    return mongoose.connect(config.MONGO_URI).then(() => {
        console.log("Mongo-db connected Successful");
    });
};
