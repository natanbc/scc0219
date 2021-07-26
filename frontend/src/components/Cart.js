import CartedProduct from "./CartedProduct";
import React from "react";
import {getCart, getProduct} from "../util/backend";
import {AuthUserContext} from "../Context";


export function Cart() {
    const [productCards, setProductCards] = React.useState([]);

    const authUserCtx = React.useContext(AuthUserContext);

    const fetchProducts = React.useCallback(async () => {
        const cart = await getCart();
        const products = Object.getOwnPropertyNames(cart);

        const productCardsTmp = await Promise.all(products.map(async id => {
            const product = await getProduct(id);
            return <li key={product.id}>
                <CartedProduct
                    photo={product.photo}
                    name={product.name}
                    price={"R$ " + product.price.toFixed(2)}
                    amount={cart[id].amount}
                />
            </li>
        }))

        setProductCards(productCardsTmp);
    }, [authUserCtx.user]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return <div>
        <ul className="products-grid">
            <>
                {productCards}
            </>
        </ul>
    </div>;
}