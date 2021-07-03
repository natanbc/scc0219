import React from 'react';

import { AuthUserContext, RouteContext } from '../Context';
import Link from './Link';

import { FormInput } from './Materialize';

async function HandleSignUp(event, usersRepo, authUserCtx, routeCtx) {
    event.preventDefault();

    const newUser = await usersRepo.createUser({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        address: event.target.address.value,
        phone: event.target.phone.value,
    });

    authUserCtx.setUser(newUser);

    const location = routeCtx.location;
    location.pathname = "/";
    routeCtx.setLocation({...location});
    alert("Success");
}

export function SignUp({usersRepo}) {

    const authUserCtx = React.useContext(AuthUserContext);
    const routeCtx = React.useContext(RouteContext);

    return <form className="card col s12"
        onSubmit={(e) => HandleSignUp(e, usersRepo, authUserCtx, routeCtx)}>

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
