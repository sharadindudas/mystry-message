import { createClient, type RedisClientType } from "redis";
import { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } from "@/config";

let redisClient: RedisClientType;

const connectRedis = async () => {
    if (!redisClient) {
        redisClient = createClient({
            password: REDIS_PASSWORD,
            socket: {
                host: REDIS_HOST,
                port: REDIS_PORT,
                connectTimeout: 10000,
                reconnectStrategy: (retries) => {
                    return Math.min(retries * 1000, 3000);
                }
            },
            commandsQueueMaxLength: 100
        });

        redisClient.on("connect", () => {
            console.log(`Redis is connected successfully`);
        });

        redisClient.on("error", (err) => {
            console.error(`Failed to connect to Redis:`, err.message);
        });

        redisClient.on("reconnecting", () => {
            console.log("Redis is reconnecting");
        });

        await redisClient.connect();
    }
};

export { redisClient, connectRedis };
