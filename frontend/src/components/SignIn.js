import React from 'react';

import Link from './Link';
import { AuthUserContext } from '../Context';
import { FormInput } from './Materialize';

async function HandleLogin(event, usersRepo, authUserCtx) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const user = await usersRepo.getByEmail(email);
    
    if (user !== undefined && user.password === password) {
        authUserCtx.setUser(user);
        event.target.email.value = "";
        event.target.password.value = "";
        alert("Success");
    } else {
        alert("Invalid email or password");
    }
}

export function SignIn({usersRepo}) {
    const authUserCtx = React.useContext(AuthUserContext);

    return <form className="card col s12" onSubmit={(e) => HandleLogin(e, usersRepo, authUserCtx)}>
        <div className="card-content">
            <FormInput name="email" type="text" icon="email">
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
