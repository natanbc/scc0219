import {Db} from "mongodb";
import { readFileSync } from "fs";

async function loadDataset(db: Db, name: string) {
    //empty .catch to ignore errors if the collection doesn't already exist
    await db.dropCollection(name).catch(() => {});
    const coll = db.collection(name);
    const data = JSON.parse(readFileSync(`dev_data/${name}.json`).toString("utf8"));
    for(const v of data) {
        await coll.insertOne(v);
    }
}

export async function createDevelopmentData(db: Db) {
    for(const e of ["products", "users", "carts"]) {
        await loadDataset(db, e);
    }
}