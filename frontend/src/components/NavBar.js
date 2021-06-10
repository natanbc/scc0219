/**
 *  NavBar / App Header
 */
export function NavBar() {
    return <nav>
        <div className="nav-wrapper">
            <a href="/" className="brand-logo center">Ram Ranch</a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li>
                    <a href="/products">Products</a>
                </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                    <a href="/cart">
                        <i className="material-icons">shopping_cart</i>
                    </a>
                </li>
                <li>
                    <a href="/signin">
                        Login
                        <i className="material-icons right">account_circle</i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>;
}