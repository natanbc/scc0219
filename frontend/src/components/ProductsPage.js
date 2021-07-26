import React from "react";

import { AuthUserContext } from '../Context';
import Route from './Route';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js';
import './ProductsPage.scss';
import {addToCart, isLoggedIn, loadProducts} from "../util/backend";

export function ProductsPage() {
    // State
    const [productToEdit, setProductToEdit] = React.useState(null);

    const [productCards, setProductCards] = React.useState([]);

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        const productCardsTmp = [];

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
                productCardsTmp.push(
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
                    </li>);
            }
        }

        setProductCards(productCardsTmp);
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
        <ProductsFilterSidebar/>
        <ul className="products-grid">
            <>
                {productCards}
            </>
        </ul>
    </div>;
}
