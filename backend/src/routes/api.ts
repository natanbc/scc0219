import express from "express";

import {login, signup, requireAuth} from "./auth.js";
import {listProducts, createProduct, updateProduct} from "./products.js";
import {listUsers, createUser, updateUser} from "./users.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

const todo = (_: express.Request, res: express.Response) => res.status(500).json({ message: "unimplemented" });

//list products
router.get("/products", listProducts);

//update products (admin-only)
router.post("/products", requireAuth(true), createProduct);
router.patch("/products/:id", requireAuth(true), updateProduct);

//manipulate cart
router.get("/cart", requireAuth(false), todo);
router.post("/cart", requireAuth(false), todo);
router.delete("/cart/:id", requireAuth(false), todo);

//list and update users (admin-only)
router.get("/users", requireAuth(true), listUsers);
router.post("/users", requireAuth(true), createUser);
router.patch("/users/:id", requireAuth(true), updateUser);

export default router;