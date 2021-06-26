import React from "react";

import Route from './Route';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js';
import './ProductsPage.css';

export function ProductsPage({productsRepo}) {
    // State
    const [productToEdit, setProductToEdit] = React.useState(null);

    const [productCards, setProductCards] = React.useState([]);

    React.useEffect(() => {
        async function loadUsers() {
            // TODO: Paging
            // TODO: Handle errors
            const products = await productsRepo.findByIdRange(0);

            const productCardsTmp = [];
            for (const product of products) {
                productCardsTmp.push(
                    <li key={product.id}>
                        <ProductCard
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            photo={product.photo}
                            onEdit={ () => setProductToEdit(product) }
                        />
                    </li>);
            }

            setProductCards(productCardsTmp);
        }

        loadUsers();
    }, [productsRepo, productToEdit]);


    return <div className="products-page">
        <Route hash="#edit-product">
            <ProductEditModal id="edit-product" productsRepo={productsRepo}
                product={{...productToEdit}} isNew={false}
                onClose={() => setProductToEdit(null) }/>
        </Route>
        <ul className="products-grid">
            <>
                {productCards}
            </>
        </ul>
        <ProductsFilterSidebar/>
    </div>;
}
