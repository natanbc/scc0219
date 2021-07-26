import express from "express";
import Server from "../server.js";
import {generateID, isValidID} from "../util/id.js";
import {hashPassword} from "../util/crypto.js";

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
                delete e["password"];
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
    const server = Server.fromApp(req.app);

    if(req.body["password"]) {
        req.body["password"] = hashPassword(req.body["password"]);
    }
    req.body["id"] = generateID();
    delete req.body["_id"];

    server.database.collection("users")
        .insertOne(req.body)
        .then(() => {
            res.status(200).json({ message: "Created" });
        })
        .catch(e => {
            console.error("Error creating user", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

export function updateUser(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const id = req.params["id"];
    if(!id || !isValidID(id)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }

    if(req.body["password"]) {
        req.body["password"] = hashPassword(req.body["password"]);
    }

    server.database.collection("users")
        .updateOne({ id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ message: "Updated" });
        })
        .catch(e => {
            console.error("Error updating user", e);
            res.status(500).json({ message: "Internal server error" });
        });
}