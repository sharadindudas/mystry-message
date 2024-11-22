import { MONGODB_URL } from "@/config";
import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

export const connectMongoDB = async () => {
    // Check if the connection to mongodb is already made or not
    if (connection.isConnected) {
        console.log(`Already connected to MongoDB`);
        return;
    }
    try {
        const db = await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME
        });
        console.log(`MongoDB is connected successfully`);
        connection.isConnected = db.connections[0].readyState;
    } catch (err) {
        console.error(`Failed to connect to MongoDB: `, err);
        process.exit(1);
    }
};
