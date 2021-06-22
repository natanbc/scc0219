import './App.scss';
import { NavBar } from './components/NavBar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './components/HomePage.js';
import { ProductsPage } from './components/ProductsPage.js'
import { UsersPage } from './components/UsersPage.js'
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
		</main>
		<Footer></Footer>
	</>;
}

export default App;
