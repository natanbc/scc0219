import React from "react";

import { AuthUserContext } from '../Context';
import Link from './Link';
import Route from './Route';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js';
import './ProductsPage.scss';
import {addToCart, isLoggedIn, loadProducts} from "../util/backend";
import Filters from "../util/filters";

export function ProductsPage() {
    // State
    const [productToEdit, setProductToEdit] = React.useState(null);

    const [allProducts, setAllProducts] = React.useState([]);

    const [filters, setFilters] = React.useState(new Filters());

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        const _all = [];

        let fetchId = "0";
        while(true) {
            let products;
            try {
                products = await loadProducts(fetchId);
            } catch(e) {
                console.error(e);
                alert("Error requesting product list");
                break;
            }
            if(products.length === 0) break;
            fetchId = products[products.length - 1].id;
            for (const product of products) {
                _all.push(product);
            }
        }

        setAllProducts(_all);
    }, [authUserCtx.user, productToEdit]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return <div className="products-page">
        <Route hash="#edit-product">
            <ProductEditModal id="edit-product"
                product={{...productToEdit}} isNew={false}
                onClose={() => setProductToEdit(null) }/>
        </Route>
        <Route hash="#new-product">
            <ProductEditModal id="new-product"
                product={{...productToEdit}} isNew={true}
                onClose={() => setProductToEdit(null) }/>
        </Route>
        <div className="fixed-action-btn">
            <Link href="#new-product" onClick={() => setProductToEdit({}) }
                className="btn-floating btn-large orange accent-4 waves-effect">
                <i className="material-icons large">add</i>
            </Link>
        </div>
        <ProductsFilterSidebar
            products={allProducts}
            onChange={(key, value, enabled) => setFilters(filters.with(key, value, enabled))}
            filter={filters}
        />
        <ul className="products-grid">
            <>
                {filters.filterValues(allProducts).map(product => <>
                    <li key={product.id}>
                        <ProductCard
                            product={product}
                            onBuy={ async () => {
                                if(!isLoggedIn()) {
                                    return "/signin";
                                }
                                try {
                                    const { ok, message } = await addToCart(product.id);
                                    if(!ok) {
                                        alert("Unable to add to cart: " + message);
                                        return "/products"
                                    }
                                } catch (e) {
                                    console.log("Unable to add to cart:", e);
                                    return "/signin";
                                }
                            } }
                            onEdit={ () => setProductToEdit(product) }
                            editable={ authUserCtx.user != null && authUserCtx.user.isAdmin }
                        />
                    </li>
                    </>
                )}
            </>
        </ul>
    </div>;
}
