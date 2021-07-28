import React from 'react';

import { AuthUserContext, RouteContext } from '../Context';
import Link from './Link';

import { FormInput } from './materialize';
import { signUp } from "../util/backend";

async function HandleSignUp(event, authUserCtx, routeCtx) {
    event.preventDefault();
    if(event.target.password.value !== event.target["confirm-password"].value) {
        alert("Passwords do not match");
        return;
    }

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

    const [user, setUser] = React.useState({});

    return <form className="card col s12"
        onSubmit={(e) => HandleSignUp(e, authUserCtx, routeCtx)}>

            <div className="card-content">
                <FormInput name="name" type="text" icon="person" onChange={(event) =>
                    setUser({...user, name: event.target.value})
                }>
                    Name</FormInput>
                <FormInput name="email" type="email" icon="email" className="validate" onChange={(event) =>
                    setUser({...user, email: event.target.value})
                }>
                    Email</FormInput>
                <FormInput name="password" type="password" icon="password"
                           className={user.password === user.confirmPassword ? "" : "invalid"}
                           onInput={(event) =>
                    setUser({...user, password: event.target.value})
                }>
                    Password</FormInput>
                <FormInput name="confirm-password" type="password" icon="password"
                           className={user.password === user.confirmPassword ? "" : "invalid"}
                           onInput={(event) =>
                               setUser({...user, confirmPassword: event.target.value})
                           }>
                    Confirm Password</FormInput>
                <FormInput name="address" type="text" icon="place" onChange={(event) =>
                    setUser({...user, address: event.target.value})
                }>
                    Endereço</FormInput>
                <FormInput name="phone" type="tel" icon="phone" onChange={(event) =>
                    setUser({...user, phone: event.target.value})
                }>
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
