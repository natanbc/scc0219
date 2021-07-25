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
				<NavBar/>
			</header>
			<main>
				<Route path="/">
					<HomePage/>
				</Route>
				<Route path="/products">
					<ProductsPage productsRepo={productsRepo}/>
				</Route>
				<Route path="/users">
					<UsersPage usersRepo={usersRepo}/>
				</Route>
				<Route path="/signup">
					<SignUpPage/>
				</Route>
				<Route path="/signin">
					<SignInPage/>
				</Route>
				<Route path="/cart">
					<Cart/>
				</Route>
			</main>
			<Footer/>
		</RouteContext.Provider>
	</AuthUserContext.Provider>;
}

export default App;
