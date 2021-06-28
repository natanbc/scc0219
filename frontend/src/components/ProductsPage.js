import React from "react";

import { AuthUserContext } from '../Context';
import Route from './Route';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js';
import './ProductsPage.css';

export function ProductsPage({productsRepo}) {
    // State
    const [productToEdit, setProductToEdit] = React.useState(null);

    const [productCards, setProductCards] = React.useState([]);

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        // TODO: Paging
        // TODO: Handle errors
        const products = await productsRepo.findByIdRange(0);

        const productCardsTmp = [];
        for (const product of products) {
            productCardsTmp.push(
                <li key={product.id}>
                    <ProductCard
                        product={product}
                        onEdit={ () => setProductToEdit(product) }
                        editable={ authUserCtx.user != null && authUserCtx.user.isAdmin }
                    />
                </li>);
        }

        setProductCards(productCardsTmp);
    }, [authUserCtx.user, productsRepo]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return <div className="products-page">
        <Route hash="#edit-product">
            <ProductEditModal id="edit-product" productsRepo={productsRepo}
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
