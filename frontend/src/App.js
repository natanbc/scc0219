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

function App({usersRepo, productsRepo}) {
	return <>
		<header>
			<NavBar></NavBar>
		</header>
		<main>
			<Route path="/">
				<HomePage></HomePage>
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
	</>;
}

export default App;
