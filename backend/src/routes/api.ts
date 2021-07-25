import express from "express";

import {login, signup, requireAuth} from "./auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

//list products
router.get("/products", todo);

//update products (admin-only)
router.post("/products", requireAuth(true), todo);
router.put("/products/:id", requireAuth(true), todo);

//manipulate cart
router.get("/cart", requireAuth(false), todo);
router.post("/cart", requireAuth(false), todo);
router.delete("/cart/:id", requireAuth(false), todo);

export default router;