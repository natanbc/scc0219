import React from 'react';

import { AuthUserContext, RouteContext } from '../Context';
import Link from './Link';

import { FormInput } from './Materialize';
import { signUp } from "../util/backend";

async function HandleSignUp(event, authUserCtx, routeCtx) {
    event.preventDefault();

    try {
        await signUp(
            authUserCtx,
            event.target.name.value,
            event.target.email.value,
            event.target.password.value,
            event.target.address.value,
            event.target.phone.value
        );

        const location = routeCtx.location;
        location.pathname = "/";
        routeCtx.setLocation({...location});
        alert("Success");
    } catch(e) {
        alert("Account already exists");
    }
}

export function SignUp() {

    const authUserCtx = React.useContext(AuthUserContext);
    const routeCtx = React.useContext(RouteContext);

    return <form className="card col s12"
        onSubmit={(e) => HandleSignUp(e, authUserCtx, routeCtx)}>

            <div className="card-content">
                <FormInput name="name" type="text" icon="person">
                    Name</FormInput>
                <FormInput name="email" type="email" icon="email">
                    Email</FormInput>
                <FormInput name="password" type="password" icon="password">
                    Password</FormInput>
                <FormInput name="confirm-password" type="password" icon="password">
                    Confirm Password</FormInput>
                <FormInput name="address" type="text" icon="place">
                    Endereço</FormInput>
                <FormInput name="phone" type="tel" icon="phone">
                    Telefone</FormInput>
            </div>
            <div className="card-action row" style={{ marginBottom: 0 }}>
                <Link href="/signin" className="btn-outlined waves-effect col m5">
                    SIGN IN
                </Link>
                <button className="btn waves-effect waves-light right" type="submit" name="action">
                    SIGN UP
                    <i className="material-icons right">login</i>
                </button>
            </div>
        </form>;
}
