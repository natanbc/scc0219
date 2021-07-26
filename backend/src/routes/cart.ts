import express from "express";

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

export function getCart(req: express.Request, res: express.Response): void {
    todo(req, res);
}

export function addToCart(req: express.Request, res: express.Response): void {
    todo(req, res);
}

export function removeFromCart(req: express.Request, res: express.Response): void {
    todo(req, res);
}

export function increaseCartAmount(req: express.Request, res: express.Response): void {
    todo(req, res);
}

export function decreaseCartAmount(req: express.Request, res: express.Response): void {
    todo(req, res);
}
