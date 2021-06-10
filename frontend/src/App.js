import './App.scss';
import {NavBar} from './components/NavBar.js';
import {Footer} from './components/Footer.js';
import {HomePage} from './components/HomePage.js';
import {ProductCard} from './components/ProductCard.js'
import {ProductsPage} from './components/ProductsPage.js'

// Needed for certain components that use js.
import M from '@materializecss/materialize';

function App() {
  return <>
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <ProductsPage></ProductsPage>
        {/* <HomePage></HomePage> */}
      </main>
      <Footer></Footer>
    </>;
}

export default App;
