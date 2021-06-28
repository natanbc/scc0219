import { RouteContext } from '../Context';
import React from 'react';

export default function Link(props) {
    const routeCtx = React.useContext(RouteContext);

    return <a {...props} onClick={(event) => {
        if (props.onClick !== undefined) {
            props.onClick(event);
        }

        if (props.href !== undefined) {
            window.history.pushState({}, null, props.href);
            routeCtx.setLocation({...window.location});
        }
        event.preventDefault();
    }}/>
}
