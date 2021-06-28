import React from 'react';
import M from 'materialize-css';

import Link from './Link';
import { AuthUserContext } from '../Context';
import './NavBar.css';

function LoginItem({user, logOut}) {

    const ref = React.createRef();
    
    React.useEffect(() => M.Dropdown.init(ref.current, {}));

    return <>
        <ul id="user-dropdown" className="dropdown-content">
            { user.isAdmin && <li><a href="/users">Manage Users</a></li> }
            <li><Link href="/" onClick={logOut}>Log Out</Link></li>
        </ul>
        <btn ref={ref} className="dropdown-trigger" data-target="user-dropdown">
            {user.name}
            <i className="material-icons right">account_circle</i>
        </btn>
    </>;
}

function LoginStatus() {
    return <AuthUserContext.Consumer>
            {context => {
                if (context.user === null) {
                    return <Link href="/signin">
                        Login
                        <i className="material-icons right">account_circle</i>
                    </Link>
                } else {
                    return <LoginItem user={context.user} logOut={() => context.setUser(null)}/>
                }
            }}
        </AuthUserContext.Consumer>;
}

/**
 *  NavBar / App Header
 */
export function NavBar() {
    return <>
        <nav>
            <div className="nav-wrapper">
                <Link href="/" className="brand-logo center">Ram Ranch</Link>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link href="/cart">
                            <i className="material-icons">shopping_cart</i>
                        </Link>
                    </li>
                    <li>
                        <AuthUserContext.Consumer>
                            {context => context.user === null
                                ?   <Link href="/signin">Login
                                        <i className="material-icons right">account_circle</i>
                                    </Link>
                                :   <LoginItem user={context.user}
                                        logOut={() => context.setUser(null)}/>
                            }
                        </AuthUserContext.Consumer>
                    </li>
                </ul>
            </div>
        </nav>
    </>;
}
