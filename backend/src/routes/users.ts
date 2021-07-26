import express from "express";
import Server from "../server.js";
import {generateID, isValidID} from "../util/id.js";

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

export function listUsers(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const after = req.query["after"];
    if(typeof after !== 'string' || !isValidID(after)) {
        res.status(400).json({ message: "Invalid or missing 'after' query string" });
        return;
    }

    (async () => {
        const results: object[] = [];
        await server.database.collection("users")
            .find({ id: { $gt: after }})
            .sort({ id: 1 })
            .limit(3)
            .forEach(e => {
                delete e["_id"];
                results.push(e);
            });
        return results;
    })().then(results => {
        res.status(200).json(results);
    }).catch(e => {
        console.error("Error fetching users", e);
        res.status(500).json({ message: "Internal server error" })
    })
}

export function createUser(req: express.Request, res: express.Response): void {
    const id = generateID();
    console.log("id:", id);
    todo(req, res);
}

export function updateUser(req: express.Request, res: express.Response): void {
    todo(req, res);
}