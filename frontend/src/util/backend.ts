import { models } from 'ramranch-lib';

interface IAuthUserContext {
    user: models.User,
    setUser: (user: models.User | null) => void
};

export function getUserDetails() {
    const r = localStorage.getItem("user");
    if(!r) return null;
    return JSON.parse(r);
}

export function isLoggedIn() {
    return getUserDetails() != null;
}

export function logout(userContext: IAuthUserContext) {
    userContext.setUser(null);
    localStorage.removeItem("user");
}

export function request(path: string, options?: RequestInit): Promise<Response> {
    //allows using `yarn start` with the backend
    const prefix = process.env.REACT_APP_API_PREFIX
        ?? localStorage.getItem("request_prefix");

    return fetch(prefix ? prefix + path : path, options);
}

function jsonBody(body: any, opts?: RequestInit) {
    if(!opts) opts = {};
    opts.body = JSON.stringify(body);
    if(!opts.headers) opts.headers = {};
    // @ts-ignore
    opts.headers["Content-Type"] = "application/json";
    return opts;
}

async function doAuth(context: IAuthUserContext, path: string, body: any) {
    const resp = await request(path, jsonBody(body, {
        method: "POST"
    }));
    let user;
    if(!resp.ok || resp.status !== 200 || !(user = await resp.json()).token) {
        context.setUser(null);
        throw new Error("Login failed");
    }
    localStorage.setItem("user", JSON.stringify(user));
    context.setUser(user);
    return user;
}

/**
 * @param userContext Context of the user session.
 * @param email       User's email
 * @param password    User's password.
 *
 * @returns {Promise<Object>} User's data.
 */
export function login(userContext: IAuthUserContext, email: string, password: string) {
    return doAuth(userContext, "/api/login", { email, password });
}

/**
 * @param userContext Context of the user session.
 * @param name        User's name.
 * @param email       User's email.
 * @param password    User's password.
 * @param address     User's address.
 * @param phone       User's phone number.
 *
 * @returns {Promise<Object>} User's data.
 */
export function signUp(
    userContext: IAuthUserContext,
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string) {
    return doAuth(userContext, "/api/signup", { name, email, password, address, phone });
}

export function loadProducts(startId: string): Promise<Object[]> {
    return request("/api/products?after=" + startId)
        .then(r => r.json());
}

export async function getProduct(id: string): Promise<models.Product> {
    return request("/api/products/" + id)
        .then(r => r.json())
        .then(j => models.Product.tryFrom(j));
}

async function doAuthenticatedRequest(path: string, opts?: RequestInit) {
    const user = getUserDetails();
    if(user === null) throw new Error("Not authenticated");
    if(!opts) opts = {};
    if(!opts.headers) opts.headers = {};
    // @ts-ignore
    opts.headers["Authorization"] = user.token;
    return await request(path, opts);
}

export function createProduct(data: models.Product): Promise<void> {
    return doAuthenticatedRequest("/api/products", jsonBody(data, {
        method: "POST",
    })).then(r => r.json());
}

export function updateProduct(id: string, data: models.Product): Promise<void> {
    return doAuthenticatedRequest("/api/products/" + id, jsonBody(data, {
        method: "PATCH",
    })).then(r => r.json());
}

export function getCart(): Promise<Object[]> {
    return doAuthenticatedRequest("/api/cart").then(r => r.json());
}

export interface MsgResponse {
    ok: boolean,
    message: any,
}

export function addToCart(id: string): Promise<MsgResponse> {
    return doAuthenticatedRequest("/api/cart", jsonBody({ id }, {
        method: "POST",
    })).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    });
}

export function removeFromCart(id: string): Promise<MsgResponse> {
    return doAuthenticatedRequest("/api/cart/" + id, {
        method: "DELETE",
    }).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    })
}

export function increaseCartAmount(id: string): Promise<MsgResponse> {
    return doAuthenticatedRequest(`/api/cart/${id}/inc`, {
        method: "POST",
    }).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    })
}

export function decreaseCartAmount(id: string): Promise<MsgResponse> {
    return doAuthenticatedRequest(`/api/cart/${id}/dec`, {
        method: "POST",
    }).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    })
}

export function loadUsers(startId: string): Promise<Object[]> {
    return doAuthenticatedRequest("/api/users?after=" + startId).then(r => r.json());
}

export function createUser(data: models.User): Promise<void> {
    return doAuthenticatedRequest("/api/users", jsonBody(data, {
        method: "POST",
    })).then(r => r.json());
}

export function updateUser(id: string, data: models.User): Promise<void> {
    return doAuthenticatedRequest("/api/users/" + id, jsonBody(data, {
        method: "PATCH",
    })).then(r => r.json());
}
