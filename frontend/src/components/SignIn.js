import React from 'react';

import Link from './Link';
import { AuthUserContext, RouteContext } from '../Context';
import { FormInput } from './materialize';
import { login } from "../util/backend";

async function HandleLogin(event, authUserCtx, routeCtx) {
    event.preventDefault();

    try {
        await login(authUserCtx, event.target.email.value, event.target.password.value);

        const location = routeCtx.location;
        location.pathname = "/";
        routeCtx.setLocation({...location});
        alert("Success");
    } catch(e) {
        alert("Invalid email or password");
    }
}

export function SignIn() {
    const authUserCtx = React.useContext(AuthUserContext);
    const routeCtx = React.useContext(RouteContext);

    return <form className="card col s12" onSubmit={(e) => HandleLogin(e, authUserCtx, routeCtx)}>
        <div className="card-content">
            <FormInput name="email" type="email" icon="email" className="validate">
                Email</FormInput>
            <FormInput name="password" type="password" icon="password">
                Password</FormInput>
        </div>
        <div className="card-action row" style={{ marginBottom: 0 }}>
            <Link href="/signup" className="btn-outlined waves-effect col m5">SIGN UP</Link>
            <button className="btn waves-effect waves-light right col m5" type="submit" name="action">
                SIGN IN
                <i className="material-icons right">login</i>
            </button>
        </div>
    </form>;
}
