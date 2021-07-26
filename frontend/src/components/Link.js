import { RouteContext } from '../Context';
import React from 'react';

export default function Link(props) {
    const routeCtx = React.useContext(RouteContext);

    return <a {...props} onClick={async (event) => {
        event.preventDefault();
        if (props.onClick !== undefined) {
            const res = await props.onClick(event);
            //allows click handlers to provide a different href location
            if(res != null && typeof res === 'string') {
                window.history.pushState({}, null, res);
                routeCtx.setLocation({...window.location});
                return;
            }
        }

        if (props.href !== undefined) {
            window.history.pushState({}, null, props.href);
            routeCtx.setLocation({...window.location});
        }
    }}/>
}
