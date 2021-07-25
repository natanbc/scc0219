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

async function doAuth(context, path, body) {
    const resp = await request(path, {
        method: "POST",
        body: JSON.stringify(body)
    });
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

export function loadProducts(startId: number): Promise<Object[]> {
    return request("/api/products?after=" + startId).then(r => r.json());
}

async function doAuthenticatedRequest(path, init) {
    const user = getUserDetails();
    if(user === null) throw new Error("Not authenticated");
    if(!init.headers) init.headers = {};
    init.headers["Authorization"] = user.token;
    return await request(path, init);
}

export function createProduct(data): Promise<void> {
    return doAuthenticatedRequest("/api/products", {
        method: "POST",
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export function updateProduct(id, data): Promise<void> {
    return doAuthenticatedRequest("/api/products/" + id, {
        method: "PUT",
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export function getCart(): Promise<Object[]> {
    return doAuthenticatedRequest("/api/cart");
}

export function addToCart(id): Promise<void> {
    return doAuthenticatedRequest("/api/cart", {
        method: "POST",
        body: JSON.stringify({ id })
    })
}

export function removeFromCart(id): Promise<void> {
    return doAuthenticatedRequest("/api/cart/" + id, {
        method: "DELETE",
    })
}
