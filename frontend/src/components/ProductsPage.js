import { ProductCard } from './ProductCard.js'
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js' 
import { Products } from '../repository/Products.js'
import './ProductsPage.css'

export function ProductsPage() {
    const productCards = [];

    let products = new Products();
    for (let product of products.getProducts()) {
        productCards.push(
            <li>
                <ProductCard
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    photo={product.photo}
                />
            </li>);
    }

    return <div className="products-page">
        <ul className="products-grid">
            <>
                {productCards}
            </>
        </ul>
        <ProductsFilterSidebar/>
    </div>;
}