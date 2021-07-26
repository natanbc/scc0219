import express from "express";
import Server from "../server.js";
import {getUserEmail} from "./auth.js";
import {isValidID} from "../util/id.js";
import {Db} from "mongodb";

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

async function tryAdd(database: Db, productId: string, email: string) {
    //first check if the product exists
    const product = await database.collection("products")
        .findOne({ id: productId });
    if(!product) return { ok: false, message: "Product does not exist" };

    //if it does, decrease the available amount
    const updateResult = await database.collection("products")
        .updateOne(
            { id: productId, amountAvailable: { $gte: 1 }},
            { $inc: { amountAvailable: -1 } },
        );
    if(!updateResult.acknowledged || updateResult.modifiedCount === 0) {
        return { ok: false, message: "Insufficient amount in inventory" };
    }

    //if there was enough inventory, add to the cart
    await database.collection("carts")
        .updateOne(
            { owner_email: email },
            {
                $inc: { [`products.${productId}`]: 1 },
            },
            { upsert: true }
        );
    return { ok: true }
}

export function getCart(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    server.database.collection("carts")
        .findOne({ owner_email: getUserEmail(req) })
        .then(cart => {
            const products = cart ? cart["products"] || {} : {};
            res.status(200).json(products);
        })
        .catch(e => {
            console.error("Unable to fetch cart", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

export function addToCart(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const productId = req.body["id"];
    if(typeof productId !== 'string' || !isValidID(productId)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }
    const email = getUserEmail(req);

    tryAdd(server.database, productId, email)
        .then(status => {
            if(!status.ok) {
                res.status(409).json({ message: status.message });
                return;
            }
            res.status(200).json({ message: "Added to cart" });
        })
        .catch(e => {
            console.error("Unable to add item to cart", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

export function removeFromCart(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const productId = req.params["id"];
    if(!productId || !isValidID(productId)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }
    const email = getUserEmail(req);


    const p = (async () => {
        //remove from the cart and get the amount it had
        const res = await server.database.collection("carts")
            .findOneAndUpdate(
                { owner_email: email },
                { $unset: { [`products.${productId}`]: 1 } }
            )
        if(!res.ok || !res.value) return;
        const amount = res.value["products"][productId];
        if(!amount || amount <= 0) return;
        //if it was positive, return it to inventory
        await server.database.collection("products")
            .updateOne({ id: productId }, { $inc: { amountAvailable: amount } });
    })();
    p.then(() => res.status(200).json({ message: "Removed" }))
        .catch(() => res.status(500).json({ message: "Internal server error" }));
}

export function increaseCartAmount(req: express.Request, res: express.Response): void {
    //while this is a separate route, adding to cart and increasing the amount
    //do exactly the same queries.
    addToCart(req, res);
}

export function decreaseCartAmount(req: express.Request, res: express.Response): void {
    todo(req, res);
}
