import React from 'react';

import { RouteContext } from '../Context';

export default function Route({ path, hash, children }) {
    const routeCtx = React.useContext(RouteContext);

    const pathOk = path === undefined || path === routeCtx.location.pathname;
    const hashOk = hash === undefined || hash === routeCtx.location.hash;

    if (pathOk && hashOk) {
        return children;
    }

    return null;
}
