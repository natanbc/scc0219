import {Db} from "mongodb";
import { readFileSync } from "fs";

const collections = ["products", "users", "carts"];

async function loadDataset(db: Db, name: string) {
    const coll = db.collection(name);
    const data = JSON.parse(readFileSync(`dev_data/${name}.json`).toString("utf8"));
    for(const v of data) {
        await coll.insertOne(v);
    }
}

export async function clearDevelopmentData(db: Db) {
    for(const e of collections) {
        //empty .catch to ignore errors if the collection doesn't already exist
        await db.dropCollection(e).catch(() => {});
    }
}

export async function insertDevelopmentData(db: Db) {
    for(const e of collections) {
        await loadDataset(db, e);
    }
}