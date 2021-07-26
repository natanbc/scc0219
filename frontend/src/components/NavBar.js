import React from 'react';
import M from 'materialize-css';

import Link from './Link';
import { AuthUserContext } from '../Context';
import './NavBar.scss';
import {logout} from "../util/backend";

function LoginItem({id, user, logOut}) {

    const ref = React.createRef();
    
    React.useEffect(() => M.Dropdown.init(ref.current, {}));

    return <>
        <ul id={id} className="dropdown-content">
            { user.isAdmin && <li><Link href="/users">Manage Users</Link></li> }
            <li><Link href="/" onClick={logOut}>Log Out</Link></li>
        </ul>
        <a ref={ref} role="button" className="dropdown-trigger" data-target={id}>
            {user.name}
            <i className="material-icons right">account_circle</i>
        </a>
    </>;
}

/**
 *  NavBar / App Header
 */
export function NavBar() {
    const ref = React.createRef();

    React.useEffect(() => M.Sidenav.init(ref.current, {}));

    return <>
        <nav>
            <div className="nav-wrapper">
                <Link href="/" className="brand-logo center">Ram Ranch</Link>
                <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
                <ul className="left hide-on-med-and-down">
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                </ul>
                <ul className="right hide-on-med-and-down">
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
                                :   <LoginItem id="user-dropdown1" user={context.user}
                                        logOut={() => logout(context)}/>
                            }
                        </AuthUserContext.Consumer>
                    </li>
                </ul>
            </div>
        </nav>
        <ul ref={ref} className="sidenav" id="mobile-nav">
            <li>
                <Link href="/products">Products</Link>
            </li>
            <li>
                <Link href="/cart">Cart
                    <i className="material-icons right">shopping_cart</i>
                </Link>
            </li>
            <li>
                <AuthUserContext.Consumer>
                    {context => context.user === null
                        ?   <Link href="/signin">Login
                                <i className="material-icons right">account_circle</i>
                            </Link>
                        :   <LoginItem id="user-dropdown2" user={context.user}
                                logOut={() => logout(context)}/>
                    }
                </AuthUserContext.Consumer>
            </li>
        </ul>
    </>;
}
