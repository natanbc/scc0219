import express from "express";
import Server from "../server.js";
import {getUserEmail} from "./auth.js";
import {isValidID} from "../util/id.js";
import {Db} from "mongodb";

async function tryAdd(database: Db, productId: string, email: string, amount: number) {
    //first check if the product exists
    const product = await database.collection("products")
        .findOne({ id: productId });
    if(!product) return { ok: false, message: "Product does not exist" };

    //if it does, decrease the available amount
    const updateResult = await database.collection("products")
        .updateOne(
            { id: productId, amountAvailable: { $gte: amount }},
            { $inc: { amountAvailable: -amount } },
        );
    if(!updateResult.acknowledged || updateResult.modifiedCount === 0) {
        return { ok: false, message: "Insufficient amount in inventory" };
    }

    //if there was enough inventory, add to the cart
    await database.collection("carts")
        .updateOne(
            { owner_email: email },
            {
                $inc: { [`products.${productId}`]: amount },
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
            //keep only products with a non zero amount
            for(const k of Object.getOwnPropertyNames(products)) {
                if(products[k] === 0) {
                    delete products[k];
                }
            }
            res.status(200).json(products);
        })
        .catch(e => {
            console.error("Unable to fetch cart", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

function addOrIncrement(req: express.Request, res: express.Response, productId: string, amount: number): void {
    const server = Server.fromApp(req.app);
    const email = getUserEmail(req);

    tryAdd(server.database, productId, email, amount)
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

export function addToCart(req: express.Request, res: express.Response): void {
    const productId = req.body["id"];
    if(typeof productId !== 'string' || !isValidID(productId)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }

    addOrIncrement(req, res, productId, 1);
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

function parseAmount(raw: unknown): number {
    if(typeof raw !== "string") return 1;
    const parsed = parseInt(raw);
    if(isNaN(parsed) || !Number.isSafeInteger(parsed)) return 1;
    if(parsed < 1) return 1;
    return parsed;
}

export function increaseCartAmount(req: express.Request, res: express.Response): void {
    const productId = req.params["id"];
    if(typeof productId !== 'string' || !isValidID(productId)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }
    //while this is a separate route, adding to cart and increasing the amount
    //do exactly the same queries.
    addOrIncrement(req, res, productId, parseAmount(req.query["amount"]));
}

export function decreaseCartAmount(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);

    const productId = req.params["id"];
    if(!productId || !isValidID(productId)) {
        res.status(400).json({ message: "Invalid or missing product ID" });
        return;
    }
    const email = getUserEmail(req);

    const amount = parseAmount(req.query["amount"]);

    const p = (async () => {
        //try removing one from the cart
        const res = await server.database.collection("carts")
            .findOneAndUpdate(
                { owner_email: email, [`products.${productId}`]: { $gte: amount } },
                { $inc: { [`products.${productId}`]: -amount } }
            )
        if(!res.ok || !res.value) return;
        const oldAmount = res.value["products"][productId];
        if(!oldAmount || oldAmount <= 0) return;
        //if the cart had something, return it to the inventory
        await server.database.collection("products")
            .updateOne({ id: productId }, { $inc: { amountAvailable: amount } });
    })();
    p.then(() => res.status(200).json({ message: "Removed" }))
        .catch(() => res.status(500).json({ message: "Internal server error" }));
}

export function finishPurchase(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);
    const email = getUserEmail(req);

    server.database.collection("carts")
        .findOneAndDelete(
            { owner_email: email }
        )
        .then(result => {
            if(!result.ok || !result.value || Object.values(result.value).reduce((a,b) => a + b, 0) <= 0) {
                res.status(409).json({ message: "No items in the cart" });
                return;
            }
            res.status(200).json({ message: "Purchase successful" });
        })
        .catch(() => res.status(500).json({ message: "Internal server error" }));
}
