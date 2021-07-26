import express from "express";
import Server from "../server.js";

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

export function listProducts(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const rawAfter = req.query["after"];
    if(typeof rawAfter !== 'string' || isNaN(parseInt(rawAfter))) {
        res.status(400).json({ message: "Invalid or missing 'after' query string" });
        return;
    }
    const after = parseInt(rawAfter);

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
    todo(req, res);
}

export function updateProduct(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const rawId = req.params["id"];
    if(!rawId || isNaN(parseInt(rawId))) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }
    const id = parseInt(rawId);

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