import express from "express";
import Server from "../server.js";
import {generateID, isValidID} from "../util/id.js";

export function listProducts(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const after = req.query["after"];
    if(typeof after !== 'string' || !isValidID(after)) {
        res.status(400).json({ message: "Invalid or missing 'after' query string" });
        return;
    }

    (async () => {
        const results: object[] = [];
        await server.database.collection("products")
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
        console.error("Error fetching products", e);
        res.status(500).json({ message: "Internal server error" })
    })
}

export function createProduct(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    req.body["id"] = generateID();
    delete req.body["_id"];

    server.database.collection("products")
        .insertOne(req.body)
        .then(() => {
            res.status(200).json({ message: "Created" });
        })
        .catch(e => {
            console.error("Error creating product", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

export function updateProduct(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const id = req.params["id"];
    if(!id || !isValidID(id)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }

    server.database.collection("products")
        .updateOne({ id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ message: "Updated" });
        })
        .catch(e => {
            console.error("Error updating product", e);
            res.status(500).json({ message: "Internal server error" });
        });
}