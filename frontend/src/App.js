import './App.scss';
import { NavBar } from './components/NavBar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './components/HomePage.js';
import { ProductsPage } from './components/ProductsPage.js'
import { UsersPage } from './components/UsersPage.js'

function Route({ path, children }) {
	if (path === window.location.pathname) {
		return children;
	}

	return null;
}

function App() {
	return <>
		<header>
			<NavBar></NavBar>
		</header>
		<main>
			<Route path="/">
				<HomePage></HomePage>
			</Route>
			<Route path="/products">
				<ProductsPage></ProductsPage>
			</Route>
			<Route path="/users">
				<UsersPage></UsersPage>
			</Route>
		</main>
		<Footer></Footer>
	</>;
}

export default App;
