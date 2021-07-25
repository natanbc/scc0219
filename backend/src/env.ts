import process from "process";
import { existsSync, readFileSync } from "fs";

const fallback = existsSync("config.json") ? JSON.parse(readFileSync("config.json").toString('utf8')) : {};

function env(name: string): string {
    const val = process.env[name] || fallback[name];
    if(!val) throw new Error(`Variable '${name}' not found`);
    return val;
}

export const port = parseInt(env("API_LISTEN_PORT"));
if(isNaN(port) || port < 0 || port > 65535) throw new Error(`Variable 'API_LISTEN_PORT' is not a valid port`)

export const mongoHost = env("MONGO_HOST");
export const mongoUser = env('MONGO_USER');
export const mongoPassword = env("MONGO_PASSWORD");

export const jwtSecret = env("JWT_SECRET_KEY");