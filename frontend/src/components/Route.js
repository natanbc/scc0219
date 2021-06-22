function Route({ path, hash, children }) {
    const pathOk = path === undefined || path === window.location.pathname;
    const hashOk = hash === undefined || hash === window.location.hash;

    if (pathOk && hashOk) {
        return children;
    }

    return null;
};

export default Route;