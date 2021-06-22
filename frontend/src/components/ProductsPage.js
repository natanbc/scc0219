import React from "react";

import { ProductCard } from './ProductCard.js'
import {ProductsFilterSidebar} from './ProductsFilterSidebar.js' 
import './ProductsPage.css'

export function ProductsPage({productsRepo}) {
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
                        />
                    </li>);
            }

            setProductCards(productCardsTmp);
        }

        loadUsers();
    }, [productsRepo]);


    return <div className="products-page">
        <ul className="products-grid">
            <>
                {productCards}
            </>
        </ul>
        <ProductsFilterSidebar/>
    </div>;
}
