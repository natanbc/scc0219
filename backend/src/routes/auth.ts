import express from "express";
import Server from "../server.js";
import {hashPassword, verifyPassword} from "../util/crypto.js";
import {createToken, verifyToken} from "../util/auth.js";
import {onlyStrings} from "../util/prevent_injection.js";

export function login(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);
    if (server == null) {
        res.status(500).json({ message: "Internal server error" })
        return;
    }

    const { email, password } = req.body;
    //prevent mongo injection
    if(!onlyStrings(email, password)) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    server.database.collection("users")
        .findOne({ email })
        .then(user => {
            if(!user) {
                res.status(401).json({ message: "Incorrect email or password" });
                return;
            }
            if(!verifyPassword(password, user["password"])) {
                res.status(401).json({ message: "Incorrect email or password" });
                return;
            }
            return createToken(email).then(token => {
                user["token"] = token;
                res.status(200).json({
                    email,
                    token,
                    name: user["name"],
                    address: user["address"],
                    phone: user["phone"]
                });
            });
        })
        .catch(e => {
            console.log("Login failure", e);
            res.status(500).json({ message: "Internal server error" });
        });
}

export function signup(req: express.Request, res: express.Response): void {
    const server = Server.fromApp(req.app);
    if (server == null) {
        res.status(500).json({ message: "Internal server error" })
        return;
    }

    const { name, email, password, address, phone } = req.body;
    //prevent mongo injection
    if(!onlyStrings(name, email, password, address, phone)) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    const toInsert = { name, email, password: hashPassword(password), address, phone, isAdmin: false };

    server.database.collection("users")
        .insertOne(toInsert)
        .then(user => {
            if(!user || !user.acknowledged) {
                res.status(401).json({ message: "Account already exists" });
                return;
            }
            return createToken(email).then(token => {
                res.status(200).json({
                    name,
                    email,
                    address,
                    phone,
                    token
                });
            });
        })
        .catch(() => res.status(401).json({ message: "Account already exists" }));
}

/**
 * This middleware only calls the next ones after authentication is handled.
 *
 * The `Authorization` header must contain a valid token returned by the login or
 * signup routes.
 *
 * Additionally, routes may be restricted to admin users only.
 *
 * @param admin Whether or not this middleware should allow any user or only admin users.
 */
export function requireAuth(admin: boolean): (req: express.Request, res: express.Response, next: () => void) => void {
    return (req, res, next) => {
        const token = req.header("Authorization");
        if(!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const server = Server.fromApp(req.app);
        if (server == null) {
            res.status(500).json({ message: "Internal server error" })
            return;
        }
        verifyToken(token)
            .then(email => {
                return server.database.collection("users")
                    .findOne({ email })
            })
            .then(user => {
                if(!user) throw new Error("User does not exist");
                if(admin && !user["isAdmin"]) {
                    res.status(401).json({ message: "You are not an administrator" });
                    return;
                }
                // @ts-ignore
                req["__authEmail"] = user["email"];
                next();
            })
            .catch(e => {
                console.log("Authentication error:", e);
                res.status(401).json({ message: "Invalid token" });
            })
    }
}

/**
 * Retrieves the user's email from the request.
 *
 * This function should only be used in an authenticated context,
 * after running the `requireAuth` middleware from this module.
 *
 * @param req Request being handled.
 */
export function getUserEmail(req: express.Request): string {
    // @ts-ignore
    const r = req["__authEmail"] as string | undefined;
    if(!r) {
        throw new Error("Should be in authenticated context");
    }
    return r;
}
