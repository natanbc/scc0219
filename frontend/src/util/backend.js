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

async function doAuth(context, path, body) {
    const resp = await fetch(path, {
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


