import './App.scss';
import { NavBar } from './components/NavBar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './components/HomePage.js';
import { ProductsPage } from './components/ProductsPage.js';
import { UsersPage } from './components/UsersPage.js';
import { SignUpPage } from './components/SignUpPage.js';
import { SignInPage } from './components/SignInPage.js';
import { Cart } from './components/Cart.js';
import Route from './components/Route';
import React from 'react';
import { AuthUserContext, RouteContext } from './Context';

function App({usersRepo, productsRepo}) {
	const [location, setLocation] = React.useState(window.location);
	const [authUser, setAuthUser] = React.useState(null);

	return <AuthUserContext.Provider value={{ user: authUser, setUser: setAuthUser }}>
		<RouteContext.Provider value={{ location: location, setLocation: setLocation }}>
			<header>
				<NavBar></NavBar>
			</header>
			<main>
				<Route path="/">
					<HomePage usersRepo={usersRepo}></HomePage>
				</Route>
				<Route path="/products">
					<ProductsPage productsRepo={productsRepo}></ProductsPage>
				</Route>
				<Route path="/users">
					<UsersPage usersRepo={usersRepo}></UsersPage>
				</Route>
				<Route path="/signup">
					<SignUpPage></SignUpPage>
				</Route>
				<Route path="/signin">
					<SignInPage></SignInPage>
				</Route>
				<Route path="/cart">
					<Cart></Cart>
				</Route>
			</main>
			<Footer></Footer>
		</RouteContext.Provider>
	</AuthUserContext.Provider>;
}

export default App;
