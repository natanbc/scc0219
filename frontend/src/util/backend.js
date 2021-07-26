export function getUserDetails() {
    const r = localStorage.getItem("user");
    if(!r) return null;
    return JSON.parse(r);
}

export function isLoggedIn() {
    return getUserDetails() != null;
}

export function logout(userContext) {
    userContext.setUser(null);
    localStorage.removeItem("user");
}

export function request(path, options) {
    //allows using `yarn start` with the backend
    const prefix = localStorage.getItem("request_prefix");
    return fetch(prefix ? prefix + path : path, options);
}

function jsonBody(body, opts) {
    if(!opts) opts = {};
    opts.body = JSON.stringify(body);
    if(!opts.headers) opts.headers = {};
    opts.headers["Content-Type"] = "application/json";
    return opts;
}

async function doAuth(context, path, body) {
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
export function login(userContext, email, password) {
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
export function signUp(userContext, name, email, password, address, phone) {
    return doAuth(userContext, "/api/signup", { name, email, password, address, phone });
}

export function loadProducts(startId: string): Promise<Object[]> {
    return request("/api/products?after=" + startId).then(r => r.json());
}

export function getProduct(id: string): Promise<Object> {
    return request("/api/products/" + id).then(r => r.json());
}

async function doAuthenticatedRequest(path, opts) {
    const user = getUserDetails();
    if(user === null) throw new Error("Not authenticated");
    if(!opts) opts = {};
    if(!opts.headers) opts.headers = {};
    opts.headers["Authorization"] = user.token;
    return await request(path, opts);
}

export function createProduct(data): Promise<void> {
    return doAuthenticatedRequest("/api/products", jsonBody(data, {
        method: "POST",
    })).then(r => r.json());
}

export function updateProduct(id, data): Promise<void> {
    return doAuthenticatedRequest("/api/products/" + id, jsonBody(data, {
        method: "PATCH",
    })).then(r => r.json());
}

export function getCart(): Promise<Object[]> {
    return doAuthenticatedRequest("/api/cart").then(r => r.json());
}

export function addToCart(id): Promise<void> {
    return doAuthenticatedRequest("/api/cart", jsonBody({ id }, {
        method: "POST",
    })).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    });
}

export function removeFromCart(id): Promise<void> {
    return doAuthenticatedRequest("/api/cart/" + id, {
        method: "DELETE",
    }).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    })
}

export function increaseCartAmount(id): Promise<void> {
    return doAuthenticatedRequest(`/api/cart/${id}/inc`, {
        method: "POST",
    }).then(r => {
        if(r.status !== 200) {
            return r.json().then(data => ({ ok: false, message: data.message }));
        }
        return r.json().then(data => ({ ok: true, message: data.message }));
    })
}

export function decreaseCartAmount(id): Promise<void> {
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

export function createUser(data): Promise<void> {
    return doAuthenticatedRequest("/api/users", jsonBody(data, {
        method: "POST",
    })).then(r => r.json());
}

export function updateUser(id, data): Promise<void> {
    return doAuthenticatedRequest("/api/users/" + id, jsonBody(data, {
        method: "PATCH",
    })).then(r => r.json());
}
