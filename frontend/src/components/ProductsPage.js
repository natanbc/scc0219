import React from "react";

import { AuthUserContext } from '../Context';
import Route from './Route';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js';
import './ProductsPage.css';
import {addToCart, isLoggedIn, loadProducts} from "../util/backend";

export function ProductsPage() {
    // State
    const [productToEdit, setProductToEdit] = React.useState(null);

    const [productCards, setProductCards] = React.useState([]);

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        const productCardsTmp = [];

        let maxId = 0;
        while(true) {
            let products;
            try {
                products = await loadProducts(maxId);
            } catch(e) {
                console.error(e);
                alert("Error requesting product list");
                break;
            }
            if(products.length === 0) break;
            for (const product of products) {
                maxId = Math.max(maxId, product.id);
                productCardsTmp.push(
                    <li key={product.id}>
                        <ProductCard
                            product={product}
                            onBuy={ async () => {
                                if(!isLoggedIn()) {
                                    return "/signin";
                                }
                                try {
                                    await addToCart(product.id);
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
    }, [authUserCtx.user]);

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
