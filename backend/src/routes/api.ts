import express from "express";

import {login, signup, requireAuth} from "./auth.js";
import {listProducts, createProduct, updateProduct} from "./products.js";
import {getCart, addToCart, removeFromCart, increaseCartAmount, decreaseCartAmount} from "./cart";
import {listUsers, createUser, updateUser} from "./users.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

//list products
router.get("/products", listProducts);

//update products (admin-only)
router.post("/products", requireAuth(true), createProduct);
router.patch("/products/:id", requireAuth(true), updateProduct);

//manipulate cart
router.get("/cart", requireAuth(false), getCart);
router.post("/cart", requireAuth(false), addToCart);
router.delete("/cart/:id", requireAuth(false), removeFromCart);
router.post("/cart/:id/inc", requireAuth(false), increaseCartAmount);
router.post("/cart/:id/dec", requireAuth(false), decreaseCartAmount);

//list and update users (admin-only)
router.get("/users", requireAuth(true), listUsers);
router.post("/users", requireAuth(true), createUser);
router.patch("/users/:id", requireAuth(true), updateUser);

export default router;